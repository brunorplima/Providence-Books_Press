import { Review } from "../interfaces-objects/interfaces";
import Product from "../interfaces-objects/Product";
import { firestore } from "./firebase";

export const addProductToFirestore = async (product: Product) => {
   try {
      await firestore.doc(`products/${product._id}`).set(product);
      return firestore.doc(`products/${product._id}`)
   }
   catch (error) {
      window.alert('Sorry, the following error occurred: ' + error + '\nPlease try refreshing the page');
      return null;
   }
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