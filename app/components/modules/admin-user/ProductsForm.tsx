import React, { useEffect, useState } from 'react';
import FormGroup from '../form/FormGroup';
import FormInput from '../form/FormInput';
import Box from './Box';
import styles from '../../../styles/admin-user/ProductsForm.module.css';
import mainFormStyles from '../../../styles/form/MainForm.module.css';
import { LARGE, MEDIUM, SMALL, X_LARGE, X_SMALL } from '../../../util/inputFormSizes';
import FormTextArea from '../form/FormTextArea';
import FormSelect from '../form/FormSelect';
import Product from '../../../interfaces-objects/Product';
import Book from '../../../interfaces-objects/Book';
import EBook from '../../../interfaces-objects/EBook';
import AudioBook from '../../../interfaces-objects/AudioBook';
import ImageFormInput from '../form/ImageFormInput';
import Button from '../../elements/button/Button';
import EmptyUpdateFormMessage from './EmptyUpdateFormMessage';

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
   const [isbn, setIsbn] = useState(product ? typedProduct.subtitle : '');
   const [weight, setWeight] = useState(product ? bookProduct.weight : '');
   const [stock, setStock] = useState(product ? bookProduct.stock : '');
   const [price, setPrice] = useState(product ? typedProduct.price.toFixed(2) : '');
   const [providenceReview, setProvidenceReview] = useState('');
   const [files, setFiles] = useState<string[]>(product ? bookProduct.images : []);
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
               <>
                  <FormGroup>
                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={name}
                        setValue={setName}
                        size={LARGE}
                        label='Title'
                        isRequired
                     />

                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={subtitle}
                        size={X_LARGE}
                        setValue={setSubtitle}
                        label='Subtitle'
                     />

                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={isbn}
                        setValue={setIsbn}
                        label='ISBN'
                        isRequired
                     />

                     {
                        type === BOOK &&
                        <>
                           <FormInput
                              type='text'
                              inputClassName={mainFormStyles.inputField}
                              containerClassName={mainFormStyles.inputContainer}
                              value={weight}
                              setValue={setWeight}
                              size={X_SMALL}
                              label='Weight (Kg)'
                              isRequired
                           />

                           <FormInput
                              type='number'
                              inputClassName={mainFormStyles.inputField}
                              containerClassName={mainFormStyles.inputContainer}
                              value={stock}
                              setValue={setStock}
                              size={X_SMALL}
                              label='Stock'
                              isRequired
                           />
                        </>
                     }

                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={price}
                        setValue={setPrice}
                        size={X_SMALL}
                        label='Price'
                        isRequired
                     />

                     <FormTextArea
                        textareaClassName={mainFormStyles.textareaField}
                        containerClassName={mainFormStyles.textareaContainer}
                        value={providenceReview}
                        setValue={setProvidenceReview}
                        label='Providence Review'
                     />
                  </FormGroup>

                  <div className={styles.space}></div>

                  <FormGroup>
                     <ImageFormInput
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        // value={files}
                        setValue={setFiles}
                        size={MEDIUM}
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
                        size={MEDIUM}
                     />

                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={authors}
                        setValue={setAuthors}
                        size={MEDIUM}
                        label='Author(s)'
                        isRequired
                     />

                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={publisher}
                        setValue={setPublisher}
                        label='Publisher'
                        isRequired
                     />

                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={subject}
                        setValue={setSubject}
                        size={MEDIUM}
                        label='Subject'
                     />

                     <FormTextArea
                        textareaClassName={mainFormStyles.textareaField}
                        containerClassName={mainFormStyles.textareaContainer}
                        value={description}
                        setValue={setDescription}
                        label='Description'
                        isRequired
                     />
                  </FormGroup>

                  <div className={styles.space}></div>

                  <FormGroup>
                     {
                        type !== AUDIOBOOK &&
                        <FormInput
                           type='number'
                           inputClassName={mainFormStyles.inputField}
                           containerClassName={mainFormStyles.inputContainer}
                           value={numberPages}
                           setValue={setNumberPages}
                           size={X_SMALL}
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
                           containerClassName={mainFormStyles.selectContainer}
                        />
                     }

                     {
                        type !== BOOK &&
                        <FormInput
                           type='text'
                           inputClassName={mainFormStyles.inputField}
                           containerClassName={mainFormStyles.inputContainer}
                           value={fileExtensions}
                           setValue={setFileExtensions}
                           label='File extension (s)'
                           isRequired
                        />
                     }

                     {
                        type === AUDIOBOOK &&
                        <>
                           <FormInput
                              type='text'
                              inputClassName={mainFormStyles.inputField}
                              containerClassName={mainFormStyles.inputContainer}
                              value={readBy}
                              setValue={setReadBy}
                              label='Read by'
                              isRequired
                           />

                           <FormInput
                              type='text'
                              inputClassName={mainFormStyles.inputField}
                              containerClassName={mainFormStyles.inputContainer}
                              value={duration}
                              setValue={setDuration}
                              label='Duration'
                           />
                        </>
                     }

                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={age}
                        setValue={setAge}
                        size={X_SMALL}
                        label='Age'
                     />

                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={flag}
                        setValue={setFlag}
                        size={MEDIUM}
                        label='Flag'
                     />

                     <FormInput
                        type='text'
                        inputClassName={mainFormStyles.inputField}
                        containerClassName={mainFormStyles.inputContainer}
                        value={tags.split('g').join(', ').split('f').join('d')}
                        setValue={setTags}
                        size={MEDIUM}
                        label='Tags'
                     />
                  </FormGroup>

                  <div className={styles.buttonContainer}>
                     <Button label='Save' clickHandler={() => { }} secondaryStyle />
                  </div>
               </>
            }
         </Box>
      </div>
   )
}

export default ProductsForm;