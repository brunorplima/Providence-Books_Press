import React, { useEffect, useState } from 'react'
import { firestore } from '../../../firebase/firebase'
import Loading from '../loading/Loading'
import Box from './Box'
import styles from '../../../styles/admin-user/AdminContent.module.css'
import AdminContentControllers from './AdminContentControllers'
import clsx from 'clsx'
import { updateContent } from '../../../firebase/update'
import SlideShowManager from './SlideShowManager'
import { getAll, ImageStorageData } from '../../../firebase/storage'
import FeaturedProductsManager from './FeaturedProductsManager'
import ProductInfoCollectionsManager from './ProductInfoCollectionsManager'
import { useAdminContext } from '../../contexts/AdminProvider'

const AdminContent = () => {
   const [aboutUsText, setAboutUsText] = useState('')
   const [editAboutUsText, setEditAboutUsText] = useState('')
   const [biblePassage, setBiblePassage] = useState('')
   const [editBiblePassage, setEditBiblePassage] = useState('')
   const [isTextEditMode, setIsTextEditMode] = useState(false)
   const [isPassageEditMode, setIsPassageEditMode] = useState(false)
   const [isLoading, setIsLoading] = useState(true)
   const [slideShowImagesData, setSlideShowImagesData] = useState<ImageStorageData[]>([]);
   const { categories, listenForCategories, authors, listenForAuthors } = useAdminContext()

   useEffect(() => {
      listenForCategories()
      listenForAuthors()
   }, [])

   useEffect(() => {
      firestore.doc('content/about-us').get()
         .then(doc => {
            const data = doc.data()
            if (data) {
               setAboutUsText(data.mainText)
               setBiblePassage(data.biblicalText)
            }
            setIsLoading(false)
         })
         .catch(error => {
            console.error(error)
         })

      const storageImages = getAll('home-slide-show')
      storageImages.then(imgs => setSlideShowImagesData(imgs))
   }, [])

   function openTextEditMode() {
      if (!isLoading) {
         setIsTextEditMode(true)
         setEditAboutUsText(aboutUsText)
      }
   }

   function openPassageEditMode() {
      if (!isLoading) {
         setIsPassageEditMode(true)
         setEditBiblePassage(biblePassage)
      }
   }

   async function saveText() {
      await updateContent('SET_MAIN_TEXT', editAboutUsText)
      setAboutUsText(editAboutUsText)
      setIsTextEditMode(false)
   }

   async function savePassage() {
      await updateContent('SET_PASSAGE', editBiblePassage)
      setBiblePassage(editBiblePassage)
      setIsPassageEditMode(false)
   }

   return (
      <div>
         <Box paddingAll title="MANAGE WEBSITE'S CONTENT">
            <h2>Home page</h2>
            <SlideShowManager imagesData={slideShowImagesData} />
            
            &nbsp;

            <FeaturedProductsManager />

            <h2>About page</h2>
            <div>
               <div className={styles.contentContainer} style={{ marginBottom: 30 }}>
                  <div className={styles.contentLabel}>Main text:</div>
                  <div className={styles.content}>
                     {

                        !isLoading ?
                           isTextEditMode ?
                              <textarea
                                 className={clsx(styles.textTextarea, styles.textarea)}
                                 value={editAboutUsText}
                                 onChange={e => setEditAboutUsText(e.currentTarget.value)}
                              />
                              : <pre>{aboutUsText}</pre>
                           : <Loading localIsLoading size={4} />
                     }

                     <div className={styles.controllers}>
                        <AdminContentControllers
                           isEditMode={isTextEditMode}
                           setIsEditMode={setIsTextEditMode}
                           openEditMode={openTextEditMode}
                           save={saveText}
                        />
                     </div>
                  </div>
               </div>

               <div className={styles.contentContainer}>
                  <div className={styles.contentLabel}>Bible passage:</div>
                  <div className={styles.content}>
                     {
                        !isLoading ?
                           isPassageEditMode ?
                              <textarea
                                 className={clsx(styles.passageTextarea, styles.textarea)}
                                 value={editBiblePassage}
                                 onChange={e => setEditBiblePassage(e.currentTarget.value)}
                              />
                              : <pre>{biblePassage}</pre>
                           : <Loading localIsLoading size={4} />
                     }

                     <div className={styles.controllers}>
                        <AdminContentControllers
                           isEditMode={isPassageEditMode}
                           setIsEditMode={setIsPassageEditMode}
                           openEditMode={openPassageEditMode}
                           save={savePassage}
                        />
                     </div>
                  </div>
               </div>
            </div>

            <br/><br/><br/>

            <h2>Product Info Collections</h2>
            <ProductInfoCollectionsManager {...{ categories, authors }}/>

            <br/><br/><br/><br/><br/>
         </Box>
      </div>
   )
}

export default AdminContent

