import { firestore } from "./firebase"

export const deleteProduct = async (id: string) => {
   try {
      const docRef = await firestore.collection('products').where('_id', '==', id).get();
      let firestoreId: string;
      docRef.forEach(doc => firestoreId = doc.id);
      await firestore.doc(`products/${firestoreId}`).delete();
   }
   catch(error) {
      alert('Sorry, the following occurred: ' + error);
   }
}