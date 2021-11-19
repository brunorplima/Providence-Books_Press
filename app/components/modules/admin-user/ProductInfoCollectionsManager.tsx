import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { addCollection } from '../../../firebase/add'
import styles from '../../../styles/admin-user/ProductInfoCollectionsManager.module.css'
import Button from '../../elements/button/Button'
import FormInput from '../form/FormInput'

interface Props {
   readonly categories: string[]
   readonly authors: string[]
   readonly publishers: string[]
}

const ProductInfoCollectionsManager: React.FC<Props> = ({
   categories,
   authors,
   publishers
}) => {
   const [categoryValue, setCategoryValue] = useState('')
   const [categoryError, setCategoryError] = useState('')
   const [authorValue, setAuthorValue] = useState('')
   const [authorError, setAuthorError] = useState('')
   const [publisherValue, setPublisherValue] = useState('')
   const [publisherError, setPublisherError] = useState('')

   async function addCategory() {
      setCategoryError('')
      const category = categoryValue.trim()
      if (!category) {
         setCategoryError('Category cannot be empty')
         return null
      }
      if (categories.includes(category)) {
         setCategoryError('This category already exists')
         return null
      }
      await addCollection('content/categories', [...categories, category])
      setCategoryValue('')
   }

   async function removeCategory(category: string) {
      const newCategories = categories.filter(cat => cat !== category)
      await addCollection('content/categories', newCategories)
   }

   function handleCategoryChange(value: string) {
      if (value && categoryError) setCategoryError('')
      setCategoryValue(value)
   }

   async function addAuthor() {
      setCategoryError('')
      const author = authorValue.trim()
      if (!author) {
         setAuthorError('Author cannot be empty')
         return null
      }
      if (authors.includes(author)) {
         setAuthorError('This author already exists')
         return null
      }
      await addCollection('content/authors', [...authors, author])
      setAuthorValue('')
   }

   async function removeAuthor(author: string) {
      const newAuthors = authors.filter(auth => auth !== author)
      await addCollection('content/authors', newAuthors)
   }

   function handleAuthorChange(value: string) {
      if (value && authorError) setAuthorError('')
      setAuthorValue(value)
   }

   async function addPublisher() {
      setPublisherError('')
      const publisher = publisherValue.trim()
      if (!publisher) {
         setPublisherError('Publisher cannot be empty')
         return null
      }
      if (publishers.includes(publisher)) {
         setPublisherError('This publisher already exists')
         return null
      }
      await addCollection('content/publishers', [...publishers, publisher])
      setPublisherValue('')
   }

   async function removePublisher(publisher: string) {
      const newPublisher = publishers.filter(publ => publ !== publisher)
      await addCollection('content/publishers', newPublisher)
   }

   function handlePublisherChange(value: string) {
      if (value && publisherError) setPublisherError('')
      setPublisherValue(value)
   }

   return (
      <div>
         <h4>Categories</h4>
         <div className={styles.categoriesContainer}>
            <div className={styles.form}>
               <FormInput
                  type='text'
                  value={categoryValue}
                  setValue={handleCategoryChange}
                  label='New Category'
                  containerStyle={{ margin: 0 }}
                  inputStyle={categoryError ? { borderColor: 'rgb(181, 0, 0)' } : {}}
               />
               {
                  categoryError && <div className={styles.errorMessage}>{categoryError}</div>
               }

               <br />

               <div className={styles.submit}>
                  <Button
                     label='ADD'
                     clickHandler={addCategory}
                     disabled={!categoryValue}
                     secondaryStyle
                  />
               </div>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <div className={styles.categories}>
               {
                  categories.sort().map((category, idx) => (
                     <div key={category + idx} className={styles.category}>
                        <div className={styles.deleteIcon} onClick={() => removeCategory(category)}><IoIosClose fontSize={20} /></div>
                        {category}
                     </div>
                  ))
               }
            </div>
         </div>

         <br />

         <h4>Authors</h4>
         <div className={styles.categoriesContainer}>
            <div className={styles.form}>
               <FormInput
                  type='text'
                  value={authorValue}
                  setValue={handleAuthorChange}
                  label='New Author'
                  containerStyle={{ margin: 0 }}
                  inputStyle={categoryError ? { borderColor: 'rgb(181, 0, 0)' } : {}}
               />
               {
                  authorError && <div className={styles.errorMessage}>{authorError}</div>
               }

               <br />

               <div className={styles.submit}>
                  <Button
                     label='ADD'
                     clickHandler={addAuthor}
                     disabled={!authorValue}
                     secondaryStyle
                  />
               </div>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <div className={styles.categories}>
               {
                  authors.sort().map((author, idx) => (
                     <div key={author + idx} className={styles.category}>
                        <div className={styles.deleteIcon} onClick={() => removeAuthor(author)}><IoIosClose fontSize={20} /></div>
                        {author}
                     </div>
                  ))
               }
            </div>
         </div>

         <br />

         <h4>Publishers</h4>
         <div className={styles.categoriesContainer}>
            <div className={styles.form}>
               <FormInput
                  type='text'
                  value={publisherValue}
                  setValue={handlePublisherChange}
                  label='New Publisher'
                  containerStyle={{ margin: 0 }}
                  inputStyle={publisherError ? { borderColor: 'rgb(181, 0, 0)' } : {}}
               />
               {
                  publisherError && <div className={styles.errorMessage}>{publisherError}</div>
               }

               <br />

               <div className={styles.submit}>
                  <Button
                     label='ADD'
                     clickHandler={addPublisher}
                     disabled={!publisherValue}
                     secondaryStyle
                  />
               </div>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <div className={styles.categories}>
               {
                  publishers.sort().map((publisher, idx) => (
                     <div key={publisher + idx} className={styles.category}>
                        <div className={styles.deleteIcon} onClick={() => removePublisher(publisher)}><IoIosClose fontSize={20} /></div>
                        {publisher}
                     </div>
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default ProductInfoCollectionsManager
