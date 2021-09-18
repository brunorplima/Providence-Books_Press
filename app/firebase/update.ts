import AudioBook from "../interfaces-objects/AudioBook"
import Book from "../interfaces-objects/Book"
import EBook from "../interfaces-objects/EBook"
import { firestore } from "./firebase"

export const updateContent = async (option: 'SET_MAIN_TEXT' | 'SET_PASSAGE', value: string) => {
   try {
      if (option === 'SET_MAIN_TEXT') {
         await firestore.collection('content').doc('about-us').update({
            mainText: value
         })
         return value
      }
      if (option === 'SET_PASSAGE') {
         await firestore.collection('content').doc('about-us').update({
            biblicalText: value
         })
         return value
      }
   }
   catch (error) {
      console.error(error)
      return ''
   }
}

export const updateSetting = async (option: 'IMAGE_SLIDE' | 'FEAT_PROD', value: number) => {
   try {
      if (option === 'IMAGE_SLIDE') {
         await firestore.collection('settings').doc('home').update({
            slideShowInterval: value
         })
      }
      if (option === 'FEAT_PROD') {
         await firestore.collection('settings').doc('home').update({
            featuredProductsSlideInterval: value
         })
      }
   }
   catch (error) {
      console.error(error)
   }
}

export const updateProduct = async (id: string, props: Partial<Book | EBook | AudioBook>) => {
   try {
      await firestore.collection('products').doc(id).update(props)
      return firestore.collection('products').doc(id)
   } catch (error) {
      console.error(error)
   }
}