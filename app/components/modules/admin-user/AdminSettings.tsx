import React, { useEffect, useRef, useState } from 'react'
import Box from './Box'
import styles from '../../../styles/admin-user/AdminSettings.module.css'
import FormInput from '../form/FormInput'
import { firestore } from '../../../firebase/firebase'
import { X_SMALL } from '../../../util/inputFormSizes'
import Button from '../../elements/button/Button'
import { updateSetting } from '../../../firebase/update'

const AdminSettings = () => {
   const [imageSlideDelay, setImageSlideDelay] = useState<number | ''>('')
   const [featProdsDelay, setFeatProdsDelay] = useState<number | ''>('')
   const [ableToSave, setAbleToSave] = useState(false)

   const previousImageSlideDelay = useRef<number | ''>('')
   const previousFeatProdsDelay = useRef<number | ''>('')

   useEffect(() => {
      firestore.doc('settings/home').get()
      .then(doc => {
         const data = doc.data()
         const imageSlide = data?.slideShowInterval ? data.slideShowInterval / 1000 : 7
         const featSlide = data?.featuredProductsSlideInterval ? data.featuredProductsSlideInterval / 1000 : 7
         previousImageSlideDelay.current = imageSlide
         previousFeatProdsDelay.current = featSlide
         setImageSlideDelay(imageSlide)
         setFeatProdsDelay(featSlide)
      })
   }, [])

   useEffect(() => {
      if (imageSlideDelay !== previousImageSlideDelay.current) {
         setAbleToSave(true)
         previousImageSlideDelay.current = Number(imageSlideDelay)
      }
      if (featProdsDelay !== previousFeatProdsDelay.current && featProdsDelay) {
         setAbleToSave(true)
         previousFeatProdsDelay.current = Number(featProdsDelay)
      }
   }, [imageSlideDelay, featProdsDelay])

   function imageSlideDelayChange (strValue: string) {
      setImageSlideDelay(Number(strValue))
   }

   function featProdsDelayChange (strValue: string) {
      setFeatProdsDelay(Number(strValue))
   }

   function save() {
      updateSetting('IMAGE_SLIDE', (imageSlideDelay as number) * 1000)
      updateSetting('FEAT_PROD', (featProdsDelay as number) * 1000)
      setAbleToSave(false)
   }

   return (
      <div>
         <Box paddingAll title='MANAGE YOUR SETTINGS'>
            <h2>Home page</h2>
            <div className={styles.settingsContainer}>
               <div className={styles.settingDescription}>Slide delays in seconds</div>
               <div className={styles.setting}>
                  <FormInput
                     type='number'
                     value={imageSlideDelay}
                     setValue={imageSlideDelayChange}
                     label='Image Slide Show:'
                     size={X_SMALL}
                     containerStyle={{ margin: 0 }}
                     isInline
                  />
               </div>

               <div className={styles.setting}>
                  <FormInput
                     type='number'
                     value={featProdsDelay}
                     setValue={featProdsDelayChange}
                     label='Featured Products Slide Show:'
                     size={X_SMALL}
                     containerStyle={{ margin: 0 }}
                     isInline
                  />
               </div>
            </div>
            <div className={styles.saveButton}>
               <Button label='SAVE' clickHandler={save} secondaryStyle disabled={!ableToSave}/>
            </div>
         </Box>
      </div>
   )
}

export default AdminSettings
