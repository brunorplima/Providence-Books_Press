import { Review } from "../interfaces-objects/interfaces";
import Product from "../interfaces-objects/Product";
import { firestore } from "./firebase";

export const addProduct = async (product: Product) => {
   let docRef = null;
   try {
      docRef = await firestore.collection('products').add(product);
   }
   catch (error) {
      window.alert('Sorry, the following error occurred: ' + error + '\nPlease try refreshing the page');
   }
   return docRef;
}

export const addReview = async (review: Review, productId: string) => {
   try {
     return await firestore.doc(`products/${productId}`).collection('reviews').doc(review._id).set(review);
   }
   catch (error) {
      window.alert('Sorry, the following error occurred: ' + error);
      return null;
   }
}