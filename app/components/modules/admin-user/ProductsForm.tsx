import React, { useEffect, useState } from 'react';
import FormGroup from '../form/FormGroup';
import FormInput from '../form/FormInput';
import Box from './Box';
import styles from '../../../styles/admin-user/ProductsForm.module.css';
import mainFormStyles from '../../../styles/form/MainForm.module.css';
import { MEDIUM } from '../../../util/inputFormSizes';
import FormTextArea from '../form/FormTextArea';
import FormSelect from '../form/FormSelect';
import Book from '../../../interfaces-objects/Book';
import EBook from '../../../interfaces-objects/EBook';
import AudioBook from '../../../interfaces-objects/AudioBook';
import ImageProductFormInput from '../form/ImageProductFormInput';
import Button from '../../elements/button/Button';
import EmptyUpdateFormMessage from './EmptyUpdateFormMessage';
import formStyles from '../../../styles/form/ProductsForm.module.css';
import { AUDIO_BOOK_TYPE, BOOK_TYPE, BOOK_TYPES, E_BOOK_TYPE } from '../../../interfaces-objects/constants';
import { buildProduct } from '../../../util/factory';
import { putInStorage } from '../../../firebase/storage';
import { ProductLink } from '../../../interfaces-objects/interfaces';
import { addProductToFirestore } from '../../../firebase/add';
import { generateProductID, generateUid } from '../../../util/generateUid';
import { AiOutlineWarning } from 'react-icons/ai';
import runLoadingPeriod from '../../../util/runLoadingPeriod';
import ProductLinkInput from './ProductLinkInput';
import Dialog from '../dialog/Dialog';
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction';
import { useAdminContext } from '../../contexts/AdminProvider';

interface Props {
   readonly currentTab: string;
   readonly tabs: string[];
   readonly currentProduct?: Book | EBook | AudioBook;
   readonly setProductSelected?: Function
}

export type MainIndex = {
   idx: number
   isOld: boolean
}

const ProductsForm: React.FC<Props> = ({ currentTab, tabs, currentProduct, setProductSelected }) => {
   const typedProduct = currentProduct as Book | EBook | AudioBook
   const bookProduct = currentProduct as Book
   const eBookProduct = currentProduct as EBook
   const audioBookProduct = currentProduct as AudioBook

   const [type, setType] = useState(currentProduct ? currentProduct.type : '');
   const [name, setName] = useState(currentProduct ? typedProduct.name : '');
   const [subtitle, setSubtitle] = useState(typedProduct?.subtitle ? typedProduct.subtitle : '');
   const [isbn, setIsbn] = useState(typedProduct?.isbn ? typedProduct.isbn : '');
   const [weight, setWeight] = useState(currentProduct ? bookProduct.weight : '');
   const [stock, setStock] = useState(currentProduct ? bookProduct.stock : '');
   const [price, setPrice] = useState(currentProduct ? typedProduct.price.toFixed(2) : '');
   const [providenceReview, setProvidenceReview] = useState(currentProduct?.providenceReview ? currentProduct.providenceReview : '');
   const [files, setFiles] = useState<File[]>([]);
   const [fileURLs, setFileURLs] = useState<string[]>(currentProduct ? currentProduct.images : []);
   const [category, setCategory] = useState(currentProduct ? currentProduct.category : '');
   const [authors, setAuthors] = useState<string[]>(currentProduct?.authors ? typedProduct.authors.split(' & ') : []);
   const [publisher, setPublisher] = useState(currentProduct ? typedProduct.publisher : '');
   const [subject, setSubject] = useState(typedProduct?.subject ? typedProduct.subject : '');
   const [description, setDescription] = useState(bookProduct?.description ? bookProduct.description : '');
   const [numberPages, setNumberPages] = useState(bookProduct?.numberPages ? bookProduct.numberPages : '');
   const [age, setAge] = useState(currentProduct ? typedProduct.age : '');
   const [coverType, setCoverType] = useState(currentProduct ? bookProduct.coverType : '');
   const [flag, setFlag] = useState(currentProduct ? typedProduct.flag : '');
   const [tags, setTags] = useState(currentProduct ? typedProduct.tags?.join(',') ? typedProduct.tags?.join(',') : '' : '');
   const [fileExtensions, setFileExtensions] = useState(currentProduct ? eBookProduct.fileExtensions?.join(', ') : '');
   const [readBy, setReadBy] = useState(currentProduct ? audioBookProduct.readBy : '');
   const [duration, setDuration] = useState(currentProduct ? audioBookProduct.duration : '');
   const [links, setLinks] = useState<ProductLink[]>(currentProduct && currentProduct.links ? currentProduct.links : []);

   const [errors, setErrors] = useState<string[]>([])
   const [serverError, setServerError] = useState('')
   const [confirmationMessage, setConfirmationMessage] = useState('')
   const [mainIndex, setMainIndex] = useState<MainIndex | null>(null)

   const { categories, listenForCategories, authors: allAuthors, listenForAuthors } = useAdminContext()

   useEffect(() => {
      listenForCategories()
      listenForAuthors()
      return () => {
         if (currentTab === tabs[2]) setProductSelected(null);
      }
   }, [])

   if (currentTab === tabs[2] && !currentProduct) {
      return (
         <EmptyUpdateFormMessage messageType='product' />
      )
   }

   async function buildImages(id: string) {
      let images: string[] = []
      if (files?.length) {
         for (let idx = 0; idx < files.length; idx++) {
            const { url } = await putInStorage(`products/${id}/${files[idx].name}`, files[idx])
            if (mainIndex?.idx === idx && !mainIndex?.isOld) {
               images.unshift(url)
               continue
            }
            images.push(url)
         }
      }
      if (fileURLs?.length) {
         for (let idx = 0; idx < fileURLs.length; idx++) {
            if (mainIndex?.idx === idx && mainIndex?.isOld) {
               images.unshift(fileURLs[idx])
               continue
            }
            images.push(fileURLs[idx])
         }
      }
      return images
   }

   async function addProduct() {
      try {
         const isValidData = validateInput()
         if (!isValidData) return

         const loadingPeriod = runLoadingPeriod()
         loadingPeriod.next()
         const _id = currentProduct ? currentProduct._id : generateProductID()
         let images: string[] = await buildImages(_id)
         const product = buildProduct({ type, name, subtitle, isbn, weight: Number(weight), stock: Number(stock), price: Number(price), providenceReview, category, authors: authors.join(' & '), publisher, subject, description, numberPages: Number(numberPages), age, coverType, flag, tags: getSplitValue(tags), fileExtensions: getSplitValue(fileExtensions), readBy, duration, _id, _categoryId: generateUid(), _authorIds: [generateUid()], _publisherId: generateUid(), images: images ? images : currentProduct.images, links })
         const ref = await addProductToFirestore(product)
         loadingPeriod.next()
         if (ref) {
            setConfirmationMessage(`Product with ID: ${ref.id} was succesfully ${currentProduct ? 'updated' : 'added'}!`)
            resetValues()
            openDialog('CONFIRMATION')
         } else {
            setConfirmationMessage(`An unknown error occurred. Please try refreshing the page, otherwise try again later!`)
            openDialog('CONFIRMATION')
         }
      }
      catch (error) {
         console.error(error)
         setServerError(error.message)
         openDialog('ERROR')
      }
   }

   function validateInput() {
      const errorList: string[] = []
      if (!name) errorList.push('Title is required')
      if (!description) errorList.push('Description is required')
      if (!price) errorList.push('Price is required')
      if (!files?.length && !currentProduct) errorList.push('Image is required')
      if (!category) errorList.push('Category is required')
      if (!authors) errorList.push('Author is required')
      if (!publisher) errorList.push('Publisher is required')
      if (!isbn) errorList.push('ISBN is required')
      if (type === BOOK_TYPE) {
         if (!weight) errorList.push('Weight is required')
         if (!stock) errorList.push('Stock is required')
      }
      if (type === E_BOOK_TYPE) {
         if (!fileExtensions) errorList.push('File extension is required')
      }
      if (type === AUDIO_BOOK_TYPE) {
         if (!readBy) errorList.push('Ready by is required')
      }
      if (links?.length) {
         let anyEmptyDesc = false
         links.forEach(link => {
            if (link && (!link?.description || !link?.relProductId)) anyEmptyDesc = true
         })
         if (anyEmptyDesc) errorList.push('To add links you must fill description and product')
      }
      if (errorList.length) {
         setErrors(errorList)
         return false
      }
      setErrors([])
      return true
   }

   function getSplitValue(str: string, div: string = ',') {
      if (!str) return null
      return str.split(div)
   }

   function resetValues() {
      setType('')
      setName('')
      setSubtitle('')
      setIsbn('')
      setWeight('')
      setStock('')
      setPrice('')
      setProvidenceReview('')
      setFiles(null)
      setFileURLs([])
      setCategory('')
      setAuthors([])
      setPublisher('')
      setSubject('')
      setDescription('')
      setNumberPages('')
      setAge('')
      setCoverType('')
      setFlag('')
      setTags('')
      setFileExtensions('')
      setReadBy('')
      setDuration('')
      setLinks([])
   }

   function getAuthorOptions() {
      const options: string[] = []
      allAuthors.forEach(auth => !authors.includes(auth) && options.push(auth))
      return options
   }

   function changeAuthors(newAuthor: string) {
      if (newAuthor) {
         setAuthors([...authors, newAuthor])
      }
   }

   function removeAuthor(authorToRemove: string) {
      setAuthors(authors.filter(auth => auth !== authorToRemove))
   }

   return (
      <div>
         <Box paddingAll title={`${currentTab === tabs[1] ? 'ADD' : 'UPDATE'} BOOKS, E-BOOKS AND AUDIOBOOKS TO THE DATABASE`}>
            <FormSelect
               options={BOOK_TYPES}
               value={type}
               setValue={setType}
               selectClassName={mainFormStyles.selectField}
               label='Product type'
               isRequired
               containerClassName={mainFormStyles.selectContainer}
               size={MEDIUM}
               disabled={currentTab && tabs ? currentTab === tabs[2] : false}
            />

            {
               errors.length ? (
                  <div className={styles.errorsContainer}>
                     <div className={styles.errors}>
                        {
                           errors.map(err => <div key={err}><span><AiOutlineWarning /></span> {err}</div>)
                        }
                     </div>
                  </div>
               ) :
                  null
            }

            {
               type &&
               <div className={formStyles.form}>
                  <FormGroup>
                     <div className={formStyles.nonText}>
                        <div className={formStyles.nonText1}>
                           <FormInput
                              type='text'
                              value={name}
                              setValue={setName}
                              size={'100%'}
                              label='Title'
                              isRequired
                           />

                           <FormInput
                              type='text'
                              value={subtitle}
                              size={'100%'}
                              setValue={setSubtitle}
                              label='Subtitle'
                           />

                           <ImageProductFormInput
                              {...{ setFiles, fileURLs, setFileURLs, mainIndex, setMainIndex }}
                              size={'100%'}
                              label='Images'
                              isRequired={currentProduct?.images ? false : true}
                           />

                           <FormSelect
                              options={categories}
                              value={category}
                              setValue={setCategory}
                              selectClassName={mainFormStyles.selectField}
                              label='Category'
                              isRequired
                              containerClassName={mainFormStyles.selectContainer}
                              size={'100%'}
                           />

                           <FormSelect
                              options={getAuthorOptions()}
                              value={''}
                              setValue={changeAuthors}
                              size={'100%'}
                              label='Author(s)'
                              selectClassName={mainFormStyles.selectField}
                              isRequired
                           />
                           <div style={{display: 'flex', flexWrap: 'wrap', gap: 6, margin: '.3rem 0 1rem'}}>
                              {
                                 authors.map(value => (
                                    <div
                                       key={value}
                                       onClick={() => removeAuthor(value)}
                                       style={{
                                       color:'white',
                                       padding: 4,
                                       borderRadius: '.3rem',
                                       backgroundColor: 'var(--mainYellow)',
                                       cursor: 'pointer',
                                       fontSize: '10pt'
                                    }}
                                    >
                                       {value}
                                    </div>
                                 ))
                              }
                           </div>

                           <FormInput
                              type='text'
                              value={subject}
                              setValue={setSubject}
                              size={'100%'}
                              label='Subject'
                           />

                           <FormInput
                              type='text'
                              value={flag}
                              setValue={setFlag}
                              size={'100%'}
                              label='Flag'
                           />

                           <FormInput
                              type='text'
                              value={tags}
                              setValue={setTags}
                              size={'100%'}
                              label='Tags'
                           />

                           <ProductLinkInput
                              links={links}
                              setLinks={setLinks}
                              indexFrom={0}
                              hasProduct={Boolean(currentProduct)}
                           />

                           {
                              links?.length ?
                                 links.map((link, idx) => {
                                    if (idx) return (
                                       <ProductLinkInput
                                          key={link.relProductId + idx}
                                          {...{ links, setLinks, }}
                                          hasProduct={Boolean(currentProduct)}
                                          indexFrom={idx}
                                       />
                                    )
                                 }) : null
                           }

                        </div>

                        <div className={formStyles.nonText2}>
                           <FormInput
                              type='text'
                              value={isbn}
                              setValue={setIsbn}
                              label='ISBN'
                              size={'100%'}
                              isRequired
                           />

                           {
                              type === BOOK_TYPE &&
                              <>
                                 <FormInput
                                    type='text'
                                    value={weight}
                                    setValue={setWeight}
                                    size={'100%'}
                                    label='Weight (Kg)'
                                    isRequired
                                 />

                                 <FormInput
                                    type='number'
                                    value={stock}
                                    setValue={setStock}
                                    size={'100%'}
                                    label='Stock'
                                    isRequired
                                 />
                              </>
                           }

                           <FormInput
                              type='text'
                              value={price}
                              setValue={setPrice}
                              size={'100%'}
                              label='Price'
                              isRequired
                           />

                           <FormInput
                              type='text'
                              value={publisher}
                              setValue={setPublisher}
                              label='Publisher'
                              size={'100%'}
                              isRequired
                           />

                           {
                              type !== AUDIO_BOOK_TYPE &&
                              <FormInput
                                 type='number'
                                 value={numberPages}
                                 setValue={setNumberPages}
                                 size={'100%'}
                                 label='Number Pages'
                              />
                           }

                           {
                              type === BOOK_TYPE &&
                              <FormSelect
                                 options={['Hard cover', 'Paperback']}
                                 value={coverType}
                                 setValue={setCoverType}
                                 selectClassName={mainFormStyles.selectField}
                                 label='Cover type'
                                 size={'100%'}
                                 containerClassName={mainFormStyles.selectContainer}
                              />
                           }

                           <FormInput
                              type='text'
                              value={age}
                              setValue={setAge}
                              size={'100%'}
                              label='Age'
                           />

                           {
                              type !== BOOK_TYPE &&
                              <FormInput
                                 type='text'
                                 value={fileExtensions}
                                 setValue={setFileExtensions}
                                 label='File extension (s)'
                                 size={'100%'}
                                 isRequired
                              />
                           }

                           {
                              type === AUDIO_BOOK_TYPE &&
                              <>
                                 <FormInput
                                    type='text'
                                    value={readBy}
                                    setValue={setReadBy}
                                    label='Read by'
                                    size={'100%'}
                                    isRequired
                                 />

                                 <FormInput
                                    type='text'
                                    value={duration}
                                    setValue={setDuration}
                                    label='Duration'
                                    size={'100%'}
                                 />
                              </>
                           }
                        </div>
                     </div>

                     <div className={formStyles.texts}>
                        <FormTextArea
                           textareaClassName={mainFormStyles.textareaField}
                           containerClassName={mainFormStyles.textareaContainer}
                           value={providenceReview}
                           setValue={setProvidenceReview}
                           label='Providence Review'
                        />

                        <FormTextArea
                           textareaClassName={mainFormStyles.textareaField}
                           containerClassName={mainFormStyles.textareaContainer}
                           value={description}
                           setValue={setDescription}
                           label='Description'
                           isRequired
                        />

                     </div>
                  </FormGroup>

                  <div className={styles.buttonContainer}>
                     <Button label='Save' clickHandler={addProduct} secondaryStyle />
                  </div>
               </div>
            }
         </Box>

         <Dialog
            name='ERROR'
            message={serverError}
            buttonsOptions={[{
               label: 'CLOSE',
               clickHandler: closeDialog,
               secondaryStyle: true
            }]}
         />

         <Dialog
            name='CONFIRMATION'
            message={confirmationMessage}
            buttonsOptions={[{
               label: 'CLOSE',
               clickHandler: closeDialog,
               secondaryStyle: true
            }]}
         />
      </div>
   )
}

export default ProductsForm;