import { firestore } from "./firebase";

type Path = 'products' | 'articles'

export const fetchDocs = async <T>(path: Path) => {
   try {
      const productsRef = await firestore.collection(path).get();
      const list: T[] = []
      for (const doc of productsRef.docs) {
         list.push(doc.data() as T)
      }
      return list
   }
   catch (error) {

   }
}

export const fetchDoc = async <T = {}>(path: string) => {
   try {
      const doc = await firestore.doc(path).get()
      return doc.data() as T
   }
   catch (error) {

   }
}