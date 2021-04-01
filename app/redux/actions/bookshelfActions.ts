import AudioBook from "../../interfaces-objects/AudioBook";
import Book from "../../interfaces-objects/Book";
import EBook from "../../interfaces-objects/EBook";
import { BookshelfItem } from "../../interfaces-objects/interfaces";
import Product from "../../interfaces-objects/Product";
import { ADD_PRODUCT_TO_BOOKSHELF, REMOVE_ALL_FROM_BOOKSHELF, REMOVE_SOME_FROM_BOOKSHELF } from '../contants'

type Action = {
   type: string,
   payload?: BookshelfItem | BookshelfItem[]
}

export const createAddToBookshelfAction = (product: Product): Action => {
   return {
      type: ADD_PRODUCT_TO_BOOKSHELF,
      payload: {
         id: product._id,
         image: product.images[0],
         isChecked: false,
         name: product.name,
         price: product.price,
         quantity: 1,
         type: product.type,
         authors: (product as Book | EBook | AudioBook).authors,
         coverType: (product as Book).coverType ? (product as Book).coverType : undefined,
         fileExtensions: (product as EBook | AudioBook).fileExtensions ? (product as EBook | AudioBook).fileExtensions : undefined,
         subtitle: product.subtitle,
         weight: product instanceof Book ? (product as Book).weight : undefined
      }
   }
}

export const createRemoveSomeFromBookshelfAction = (products: BookshelfItem[]): Action => {
   return {
      type: REMOVE_SOME_FROM_BOOKSHELF,
      payload: products
   }
}

export const createRemoveAllFromBookshelfAction = (): Action => {
   return {
      type: REMOVE_ALL_FROM_BOOKSHELF
   }
}