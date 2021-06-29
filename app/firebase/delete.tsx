import { firestore } from "./firebase"

export const deleteAny = async (path: string, id: string) => {
   path += path.substring(path.length - 1) === '/' ? '' : '/';
   try {
      const docRef = await firestore.collection(path).where('_id', '==', id).get();
      let firestoreId: string;
      docRef.forEach(doc => firestoreId = doc.id);
      return await firestore.doc(path + firestoreId).delete();
   }
   catch (error) {
      alert('Sorry, the following occurred: ' + error);
   }
}

export const deleteProduct = async (id: string) => {
   try {
      const docRef = await firestore.collection('products').where('_id', '==', id).get();
      let firestoreId: string;
      docRef.forEach(doc => firestoreId = doc.id);
      return await firestore.doc(`products/${firestoreId}`).delete();
   }
   catch(error) {
      alert('Sorry, the following occurred: ' + error);
   }
}