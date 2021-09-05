import { Comment, Order, Review, User } from "../interfaces-objects/interfaces";
import Product from "../interfaces-objects/Product";
import firebase, { firestore } from "./firebase";

export const addProductToFirestore = async (product: Product) => {
   try {
      await firestore.doc(`products/${product._id}`).set(product);
      return firestore.doc(`products/${product._id}`)
   }
   catch (error) {
      handleError(error)
      return null;
   }
}

export const addReview = async (review: Review, productId: string) => {
   try {
      await firestore.doc(`products/${productId}/reviews/${review._id}`).set(review)
      return firestore.doc(`products/${productId}/reviews/${review._id}`)
   }
   catch (error) {
      handleError(error)
      return null
   }
}

export const createOrder = async (order: Order) => {
   try {
      await firestore.doc(`orders/${order._id}`).set(order)
      return firestore.doc(`orders/${order._id}`)
   }
   catch (error) {
      handleError(error)
   }
}

export const createUser = async (user: User) => {
   try {
      await firestore.doc(`users/${user._id}`).set(user)
      return firestore.doc(`users/${user._id}`)
   }
   catch (error) {
      handleError(error)
   }
}

export const addComment = async (comment: Comment) => {
   try {
      await firestore.doc(`articles/${comment._articleId}/comments/${comment._id}`).set(comment)
      return firestore.doc(`articles/${comment._articleId}/comments/${comment._id}`)
   }
   catch (error) {
      handleError(error)
   }
}


const handleError = (error: any) => window.alert('Sorry, the following error occurred: ' + error.message)