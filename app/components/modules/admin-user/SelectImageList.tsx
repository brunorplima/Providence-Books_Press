import React, { createRef, useEffect, useState } from 'react'
import styles from '../../../styles/admin-user/SlideShowManager.module.css'
import { ImageStorageWithCheck } from './SlideShowManager'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'

interface Props {
   readonly imagesWithCheck: ImageStorageWithCheck[]
   readonly toggleImage: Function
   readonly isLoading: boolean
}

const SelectImageList: React.FC<Props> = ({
   imagesWithCheck,
   toggleImage,
   isLoading
}) => {

   return (
      <div className={styles.images}>
         {
            imagesWithCheck.map(img => {
               return (
                  <Image
                     key={img.url}
                     imagesWithCheck={imagesWithCheck}
                     toggleImage={toggleImage}
                     isLoading={isLoading}
                     img={img}
                  />
               )
            })
         }
      </div>
   )
}



const Image: React.FC<Props & { readonly img: ImageStorageWithCheck }> = ({
   toggleImage,
   isLoading,
   img
}) => {
   const [divSize, setDivSize] = useState(0)
   const ref = createRef<HTMLDivElement>()

   useEffect(() => {
      if (!isLoading) {
         setDivSize(ref.current.clientWidth)
      }
   }, [isLoading])

   function getFileName(file: ImageStorageWithCheck) {
      const maxLength = Math.ceil(divSize / 10)
      const splittedPath = file.storageRef.fullPath.split('/')
      const name = splittedPath[splittedPath.length - 1]
      if (name.length > maxLength) return name.slice(0, maxLength) + '...'
      return name
   }

   return (
      <div
         ref={ref}
         key={img.url}
         className={styles.image}
         onClick={() => toggleImage(img)}
      >
         <div ref={ref} className={styles.imageHeader}>
            <div>{getFileName(img)}</div>
            {
               img.isChecked ?
                  <div className={styles.checkIcon}><ImCheckboxChecked /></div> :
                  <div className={styles.checkIcon}><ImCheckboxUnchecked /></div>
            }
         </div>
         <div className={styles.img}>
            <img src={img.url} alt='Slide show ' />
         </div>
      </div>
   )
}

export default SelectImageList
