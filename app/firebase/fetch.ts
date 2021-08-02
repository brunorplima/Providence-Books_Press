import { firestore } from "./firebase";
import firebase from 'firebase/app'

export type OrderBy = {
   field: string
   orderType?: firebase.firestore.OrderByDirection
}

export type Where = {
   field: string,
   condition: firebase.firestore.WhereFilterOp,
   value: any
}

export const fetchDocs = async <T>(path: string, where?: Where) => {
   try {
      let ref: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
      if (where) {
         ref = await firestore.collection(path).where(where.field, where.condition, where.value).get()
      }
      else {
         ref = await firestore.collection(path).get();
      }
      const list: T[] = []
      for (const doc of ref.docs) {
         list.push(doc.data() as T)
      }
      return list
   }
   catch (error) {
      return []
   }
}

export const fetchRefs = async(path: string, where?: Where) => {
   try {
      let ref: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
      if (where) {
         ref = await firestore.collection(path).where(where.field, where.condition, where.value).get()
      }
      else {
         ref = await firestore.collection(path).get();
      }
      return ref.docs
   }
   catch (error) {
      return []
   }
}

export const fetchDocsOrderByLimit = async <T>(path: string, orderBy: OrderBy, limit: number) => {
   const validation = path.split('/').filter(char => char === '/')
   if (validation.length % 2 !== 0) throw new Error(`Expected  number of slashes in the doc path. Received ${validation.length} slashes`)
   try {
      const ref = await firestore.collection(path).orderBy(orderBy.field, orderBy.orderType).limit(limit).get()
      const list: T[] = []
      for (const doc of ref.docs) {
         list.push(doc.data() as T)
      }
      return list
   }
   catch(error) {
      return []
   }
}

export const fetchDoc = async <T = {}>(path: string) => {
   const validation = path.split('').filter(char => char === '/')
   if (validation.length % 2 === 0) throw new Error(`Expected an odd number of slashes in the doc path. Received ${validation.length} slashes`)
   try {
      const doc = await firestore.doc(path).get()
      return doc.data() as T
   }
   catch (error) {
      return null
   }
}