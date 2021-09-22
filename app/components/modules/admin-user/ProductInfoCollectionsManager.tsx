import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { addCollection } from '../../../firebase/add'
import styles from '../../../styles/admin-user/ProductInfoCollectionsManager.module.css'
import Button from '../../elements/button/Button'
import FormInput from '../form/FormInput'

interface Props {
   readonly categories: string[]
   readonly authors: string[]
}

const ProductInfoCollectionsManager: React.FC<Props> = ({ categories, authors }) => {
   const [categoryValue, setCategoryValue] = useState('')
   const [categoryError, setCategoryError] = useState('')
   const [authorValue, setAuthorValue] = useState('')
   const [authorError, setAuthorError] = useState('')

   async function addCategory() {
      setCategoryError('')
      if (!categoryValue) {
         setCategoryError('Category cannot be empty')
         return null
      }
      if (categories.includes(categoryValue)) {
         setCategoryError('This category already exists')
         return null
      }
      await addCollection('content/categories', [...categories, categoryValue])
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
      if (!authorValue) {
         setAuthorError('Author cannot be empty')
         return null
      }
      if (authors.includes(authorValue)) {
         setAuthorError('This author already exists')
         return null
      }
      await addCollection('content/authors', [...authors, authorValue])
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
                  categories.map((category, idx) => (
                     <div key={category + idx} className={styles.category}>
                        <div className={styles.deleteIcon} onClick={() => removeCategory(category)}><IoIosClose fontSize={20} /></div>
                        {category}
                     </div>
                  ))
               }
            </div>
         </div>

         <br/>

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
                  authors.map((author, idx) => (
                     <div key={author + idx} className={styles.category}>
                        <div className={styles.deleteIcon} onClick={() => removeAuthor(author)}><IoIosClose fontSize={20} /></div>
                        {author}
                     </div>
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default ProductInfoCollectionsManager
