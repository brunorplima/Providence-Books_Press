import React, { useEffect, useState } from 'react';
import FormGroup from '../form/FormGroup';
import FormInput from '../form/FormInput';
import Box from './Box';
import styles from '../../../styles/admin-user/ProductsForm.module.css';
import mainFormStyles from '../../../styles/form/MainForm.module.css';
import { MEDIUM } from '../../../util/inputFormSizes';
import FormTextArea from '../form/FormTextArea';
import FormSelect from '../form/FormSelect';
import Product from '../../../interfaces-objects/Product';
import Book from '../../../interfaces-objects/Book';
import EBook from '../../../interfaces-objects/EBook';
import AudioBook from '../../../interfaces-objects/AudioBook';
import ImageFormInput from '../form/ImageFormInput';
import Button from '../../elements/button/Button';
import EmptyUpdateFormMessage from './EmptyUpdateFormMessage';
import formStyles from '../../../styles/form/ProductsForm.module.css';

const categories = ['Doctrine', 'Church & Culture', 'Sermons', 'commentaries', 'Bibles', 'Theology', 'Kids Books', 'Civil Government', 'World View'];
const types = ['Book', 'E-book', 'Audio book'];
const BOOK = 'Book';
const EBOOK = 'E-book';
const AUDIOBOOK = 'Audio book';

interface Props {
   readonly currentTab: string;
   readonly tabs: string[];
   readonly product?: Product;
   readonly setProductSelected?: Function
}

const ProductsForm: React.FC<Props> = ({ currentTab, tabs, product, setProductSelected }) => {
   const typedProduct = product as Book | EBook | AudioBook
   const bookProduct = product as Book
   const eBookProduct = product as EBook
   const audioBookProduct = product as AudioBook

   const [type, setType] = useState(product ? product.type : '');
   const [name, setName] = useState(product ? typedProduct.name : '');
   const [subtitle, setSubtitle] = useState(product ? typedProduct.subtitle : '');
   const [isbn, setIsbn] = useState(product ? typedProduct.isbn : '');
   const [weight, setWeight] = useState(product ? bookProduct.weight : '');
   const [stock, setStock] = useState(product ? bookProduct.stock : '');
   const [price, setPrice] = useState(product ? typedProduct.price.toFixed(2) : '');
   const [providenceReview, setProvidenceReview] = useState(product ? product.providenceReview : '');
   const [files, setFiles] = useState<FileList>(null);
   const [fileUrls, setFileUrls] = useState<string[]>(product ? bookProduct.images : []);
   const [category, setCategory] = useState(product ? product.category : '');
   const [authors, setAuthors] = useState(product ? typedProduct.authors : '');
   const [publisher, setPublisher] = useState(product ? typedProduct.publisher : '');
   const [subject, setSubject] = useState(product ? typedProduct.subject : '');
   const [description, setDescription] = useState(product ? bookProduct.description : '');
   const [numberPages, setNumberPages] = useState(product ? bookProduct.numberPages : '');
   const [age, setAge] = useState(product ? typedProduct.age : '');
   const [coverType, setCoverType] = useState(product ? bookProduct.coverType : '');
   const [flag, setFlag] = useState(product ? typedProduct.flag : '');
   const [tags, setTags] = useState(product ? typedProduct.tags?.join(', ') : '');
   const [fileExtensions, setFileExtensions] = useState(product ? eBookProduct.fileExtensions?.join(', ') : '');
   const [readBy, setReadBy] = useState(product ? audioBookProduct.readBy : '');
   const [duration, setDuration] = useState(product ? audioBookProduct.duration : '');

   useEffect(() => {
      return () => {
         if (currentTab === tabs[2]) setProductSelected(null);
      }
   }, [])

   if (currentTab === tabs[2] && !product) {
      return (
         <EmptyUpdateFormMessage messageType='product' />
      )
   }

   function addProduct() {
      
   }

   function updateProduct() {
      
   }

   return (
      <div>
         <Box paddingAll title={`${currentTab === tabs[1] ? 'ADD' : 'UPDATE'} BOOKS, E-BOOKS AND AUDIOBOOKS TO THE DATABASE`}>
            <FormSelect
               options={types}
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

                           <ImageFormInput
                              setFiles={e => setFiles(e.currentTarget.files)}
                              size={'100%'}
                              label='Images'
                              isRequired
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

                           <FormInput
                              type='text'
                              value={authors}
                              setValue={setAuthors}
                              size={'100%'}
                              label='Author(s)'
                              isRequired
                           />

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
                              value={tags.split('g').join(', ').split('f').join('d')}
                              setValue={setTags}
                              size={'100%'}
                              label='Tags'
                           />
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
                              type === BOOK &&
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
                              type !== AUDIOBOOK &&
                              <FormInput
                                 type='number'
                                 value={numberPages}
                                 setValue={setNumberPages}
                                 size={'100%'}
                                 label='Number Pages'
                              />
                           }

                           {
                              type === BOOK &&
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
                              type !== BOOK &&
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
                              type === AUDIOBOOK &&
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
                     <Button label='Save' clickHandler={() => {
                        if (product) updateProduct()
                        else addProduct()
                     }} secondaryStyle />
                  </div>
               </div>
            }
         </Box>
      </div>
   )
}

export default ProductsForm;