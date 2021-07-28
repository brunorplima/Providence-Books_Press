import firebase from 'firebase/app'
import { storage } from './firebase';

export interface ImageStorageData {
   readonly storageRef: firebase.storage.Reference
   readonly url: string
}

export const getAll = async (path: string): Promise<ImageStorageData[]> => {
   const images: ImageStorageData[] = []
   const storageRef = storage.ref(path);
   let url: string
   const list = await storageRef.listAll()
   for (const item of list.items) {
      url = await item.getDownloadURL()
      const image: ImageStorageData = {
         storageRef: item,
         url
      }
      images.push(image)
   }
   return images
}

export const putInStorageAsync = (path: string, file: any) => {
   const ref = storage.ref(path);
   const uploadTask = ref.put(file)
   return uploadTask
}

export const putInStorage = async (path: string, file: any) => {
   const ref = (await storage.ref(path).put(file)).ref
   const url = await ref.getDownloadURL()
   return { ref, url }
}

export const deleteFromStorage = async (path: string, fileName = '') => {
   const ref = await storage.ref(path + fileName)
   await ref.delete()
}