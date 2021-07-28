import React, { createRef, useEffect, useState } from 'react'
import { deleteFromStorage, ImageStorageData, putInStorage } from '../../../firebase/storage'
import styles from '../../../styles/admin-user/SlideShowManager.module.css'
import Loading from '../loading/Loading'
import ImageFormInput from '../form/ImageFormInput'
import mainFormStyles from '../../../styles/form/MainForm.module.css'
import { MEDIUM } from '../../../util/inputFormSizes'
import Button from '../../elements/button/Button'
import SelectImageList from './SelectImageList'

interface Props {
   readonly imagesData: ImageStorageData[]
}

export type ImageStorageWithCheck = ImageStorageData & { isChecked: boolean }

const SlideShowManager: React.FC<Props> = ({ imagesData }) => {

   const [imagesWithCheck, setImagesWithCheck] = useState<ImageStorageWithCheck[]>([])
   const [files, setFiles] = useState<FileList>(null)
   const [selectedFileNames, setSelectedFileNames] = useState<string[]>([])
   const [isDeleteDisabled, setIsDeleteDisabled] = useState(true)
   const [isLoading, setIsLoading] = useState(true)
   const ref = createRef<HTMLInputElement>()

   useEffect(() => {
      const withCheck = imagesData.map(img => ({
         ...img,
         isChecked: false
      }))
      setImagesWithCheck(withCheck)
      if (imagesData.length && isLoading) setIsLoading(false)
   }, [imagesData])

   useEffect(() => {
      const bools = imagesWithCheck.map(img => img.isChecked)
      setIsDeleteDisabled(!bools.includes(true))
   }, [imagesWithCheck])

   function toggleImage(imageWithCheck: ImageStorageWithCheck) {
      const updatedList = imagesWithCheck.map(img => {
         if (img.storageRef.fullPath === imageWithCheck.storageRef.fullPath) {
            return {
               ...img,
               isChecked: !img.isChecked
            }
         }
         return img
      })
      const updatedSelectedFiles: string[] = []
      updatedList.forEach(item => {
         if (item.isChecked) updatedSelectedFiles.push(item.storageRef.name)
      })
      setImagesWithCheck((updatedList))
      setSelectedFileNames(updatedSelectedFiles)
   }

   function deleteFiles() {
      setIsLoading(true)
      selectedFileNames.forEach(name => deleteFromStorage('home-slide-show/', name))
      setImagesWithCheck(imagesWithCheck.filter(img => !selectedFileNames.includes(img.storageRef.name)))
      setIsLoading(false)
   }

   function getImagesWithoutRepetition(imgs: ImageStorageWithCheck[]) {
      const images: ImageStorageWithCheck[] = []
      const fileNames: string[] = []
      const all = [...imgs, ...imagesWithCheck]
      all.forEach(item => {
         if (!fileNames.includes(item.storageRef.name)) {
            fileNames.push(item.storageRef.name)
            images.push(item)
         }
      })
      return images
   }

   async function addFiles() {
      if (!isLoading) {
         setIsLoading(true)
         let images: ImageStorageWithCheck[] = []
         for (let i = 0; i < 5; i++) {
            if (files[i]) {
               console.log('running because file exists: ', files[i].name)
               const { ref, url } = await putInStorage(`home-slide-show/${files[i].name}`, files[i])
               const image: ImageStorageWithCheck = {
                  url,
                  storageRef: ref,
                  isChecked: false
               }
               images.push(image)
            }
         }
         setFiles(null)
         setImagesWithCheck(getImagesWithoutRepetition(images))
         setIsLoading(false)
      }
   }

   return (
      <div className={styles.container}>
         <h4>Main Slide Show</h4>
         {
            // In case of no images in storage or request error this will keep Loading forever
            // Should add another condition to prevent that
            // Change isLoading in useEffect
            isLoading ?
               <div style={{
                  width: '100%',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}>
                  <Loading localIsLoading size={4} />
               </div> :
               <SelectImageList
                  imagesWithCheck={imagesWithCheck}
                  toggleImage={toggleImage}
                  isLoading={isLoading}
               />
         }
         <div className={styles.controllers}>
            <ImageFormInput
               inputClassName={mainFormStyles.inputField}
               setFiles={setFiles}
               size={MEDIUM}
               multiple
            />
            <Button
               label='Add'
               secondaryStyle
               disabled={!files}
               clickHandler={addFiles}
            />
            <Button
               label='Delete'
               secondaryStyle
               disabled={isDeleteDisabled}
               clickHandler={deleteFiles}
            />
         </div>
      </div>
   )
}

export default SlideShowManager
