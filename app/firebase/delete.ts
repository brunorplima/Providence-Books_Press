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
      await firestore.doc(`products/${id}`).delete();
   }
   catch(error) {
      console.error(error)
      alert('Sorry, the following occurred: ' + error.message);
   }
}

export const deleteArticle = async (id: string) => {
   try {
      await firestore.doc(`articles/${id}`).delete();
   }
   catch(error) {
      console.error(error)
      alert('Sorry, the following occurred: ' + error.message);
   }
}

export const deleteOrder = async (id: string) => {
   try {
      await firestore.doc(`orders/${id}`).delete();
   }
   catch(error) {
      console.error(error)
      alert('Sorry, the following occurred: ' + error.message);
   }
}