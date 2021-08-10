import { Review } from "../interfaces-objects/interfaces";
import Product from "../interfaces-objects/Product";
import { firestore } from "./firebase";

export const addProduct = async (product: Product) => {
   let docRef = null;
   try {
      docRef = await firestore.collection('products').add(product);
   }
   catch (error) {
      window.alert('Sorry, the following occurred: ' + error);
   }
   return docRef;
}

export const addReview = async (review: Review, productId: string) => {
   try {
      const ref = await firestore.collection('products').where('_id', '==', productId).get()
      await firestore.doc(`products/${ref.docs[0].id}`).collection('reviews').doc(review._id).set(review)
   }
   catch (error) {
      window.alert('Sorry, the following occurred: ' + error); 
   }
}