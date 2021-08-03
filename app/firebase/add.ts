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