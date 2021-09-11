import React, { useEffect, useState } from 'react'
import { Article } from '../../../interfaces-objects/interfaces'
import EmptyUpdateFormMessage from './EmptyUpdateFormMessage'
import styles from '../../../styles/form/ArticlesForm.module.css';
import mainFormStyles from '../../../styles/form/MainForm.module.css';
import FormGroup from '../form/FormGroup';
import FormInput from '../form/FormInput';
import { X_SMALL } from '../../../util/inputFormSizes';
import Box from './Box';
import FormTextArea from '../form/FormTextArea';
import ImageFormInput from '../form/ImageFormInput';
import FormSelect from '../form/FormSelect';
import Button from '../../elements/button/Button';
import { generateID } from '../../../util/generateUid';
import { putInStorage } from '../../../firebase/storage';
import runLoadingPeriod from '../../../util/runLoadingPeriod';
import Dialog from '../dialog/Dialog';
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction';
import { addArticleToFirestore } from '../../../firebase/add';

const categories = ['Soteorology', 'Creeds and confessions', 'Worship service', 'Lord\'s Day', 'Christology', 'Predestination', 'Sola Scriptura', 'Christian life', 'Education', 'Eschatology', 'Sermons']

interface Props {
   readonly currentTab: string;
   readonly tabs: string[];
   readonly article?: Article;
   readonly setSelectedArticle?: Function
}

const ArticlesForm: React.FC<Props> = ({
   currentTab,
   tabs,
   article: currentArticle,
   setSelectedArticle
}) => {
   const [title, setTitle] = useState(currentArticle ? currentArticle.title : '')
   const [subtitle, setSubtitle] = useState(currentArticle ? currentArticle.subtitle : '')
   const [category, setCategory] = useState(currentArticle ? currentArticle.category : '')
   const [body, setBody] = useState(currentArticle ? currentArticle.body : '')
   const [images, setImages] = useState<FileList>(null)
   const [authorName, setAuthorName] = useState(currentArticle ? currentArticle.author.name : '')
   const [authorCredential, setAuthorCredential] = useState(currentArticle ? currentArticle.author.credential : '')
   const [authorAbout, setAuthorAbout] = useState(currentArticle ? currentArticle.author.about : '')
   
   const imageUrl = currentArticle ? currentArticle.image : ''
   const [error, setError] = useState('')

   useEffect(() => {
      return () => {
         if (currentTab === tabs[2]) setSelectedArticle(null);
      }
   }, [])

   if (currentTab === tabs[2] && !currentArticle) {
      return (
         <EmptyUpdateFormMessage messageType='article' />
      )
   }

   async function addArticle() {
      if (!validateInput()) return
      const loading = runLoadingPeriod()
      loading.next()
      const _id = currentArticle ? currentArticle._id : generateID('article')
      let image: string = imageUrl
      if (images) image = (await putInStorage(`articles/${_id}/${images[0].name}`, images[0])).url
      const datePosted = new Date().toString()
      const article: Article = {
         _id,
         image,
         title,
         subtitle,
         author: { name: authorName, credential: authorCredential, about: authorAbout },
         category,
         body,
         datePosted
      }
      const ref = await addArticleToFirestore(article)
      if (ref) openDialog('CREATE')
      else openDialog('SOME_ERROR')
      loading.next()
      resetValues()
   }

   function validateInput() {
      setError('')
      if (!title) {
         setError('Title is required')
         return false
      }
      if (!category) {
         setError('Category is required')
         return false
      }
      if (!images && !imageUrl) {
         setError('Image is required')
         return false
      }
      if (!authorName || !authorCredential) {
         setError('Author name and honorific are required')
         return false
      }
      if (!body) {
         setError('Article body text is required')
         return false
      }
      return true
   }

   function resetValues() {
      setTitle('')
      setSubtitle('')
      setCategory('')
      setBody('')
      setImages(null)
      setAuthorName('')
      setAuthorCredential('')
      setAuthorAbout('')
   }

   return (
      <div>
         <Box paddingAll title={`${currentTab === tabs[1] ? 'ADD' : 'UPDATE'} ARTICLE TO THE DATABASE`}>
            {
               error &&
               <div className={styles.error}>
                  <div>{error}</div>
               </div>
            }

            <form className={styles.form} style={{ maxWidth: 600, margin: '0 auto' }}>
               <FormGroup>
                  <div className={styles.nonText} style={{ display: 'flex', width: '100%' }}>
                     <div className={styles.nonText1} style={{ flex: 5 }}>
                        <FormInput
                           type='text'
                           value={title}
                           setValue={setTitle}
                           label='Title'
                           isRequired
                        />

                        <FormInput
                           type='text'
                           value={subtitle}
                           setValue={setSubtitle}
                           label='Subtitle'
                        />

                        <FormSelect
                           options={categories}
                           value={category}
                           setValue={setCategory}
                           selectClassName={mainFormStyles.selectField}
                           label='Category'
                           isRequired
                           containerClassName={mainFormStyles.selectContainer}
                        />
                     </div>

                     <div style={{ width: 25 }}></div>

                     <div className={styles.nonText2} style={{ flex: 3 }}>
                        <ImageFormInput
                           setFiles={setImages}
                           label='Image'
                           isRequired
                        />

                        <FormInput
                           type='text'
                           value={authorName}
                           setValue={setAuthorName}
                           label='Author name'
                           isRequired
                        />

                        <FormInput
                           type='text'
                           value={authorCredential}
                           setValue={setAuthorCredential}
                           size={X_SMALL}
                           label='Author honorific'
                           isRequired
                        />
                     </div>
                  </div>

                  <div className={styles.texts} style={{ width: '100%' }}>
                     <FormTextArea
                        value={body}
                        setValue={setBody}
                        label='Text body'
                        isRequired
                     />

                     <FormTextArea
                        value={authorAbout}
                        setValue={setAuthorAbout}
                        label='About author'
                     />
                  </div>
               </FormGroup>

               <div className={styles.buttonContainer}>
                  <Button label='Save' clickHandler={addArticle} secondaryStyle isSubmit />
               </div>
            </form>
         </Box>

         <Dialog
            name='CREATE'
            message='Article was added with success'
            dialogType='info'
            buttonsOptions={[{
               label: 'CLOSE',
               clickHandler: closeDialog,
               isSubmit: true,
               secondaryStyle: true
            }]}
         />

         <Dialog
            name='SOME_ERROR'
            message='Article was not saved. Please try again later'
            dialogType='warning'
            buttonsOptions={[{
               label: 'CLOSE',
               clickHandler: closeDialog,
               isSubmit: true,
               secondaryStyle: true
            }]}
         />
      </div>
   )
}

export default ArticlesForm
