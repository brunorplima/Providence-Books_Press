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
   const bookshelfItem: BookshelfItem = {
      id: product._id,
      image: product.images[0],
      isChecked: false,
      name: product.name,
      price: product.price,
      quantity: 1,
      type: product.type,
   }
   if (product.type === 'Book') bookshelfItem.weight = (product as Book).weight
   if ((product as Book | EBook | AudioBook).authors) bookshelfItem.authors = (product as Book | EBook | AudioBook).authors
   if ((product as Book).coverType) bookshelfItem.coverType = (product as Book).coverType
   if ((product as EBook | AudioBook).fileExtensions) bookshelfItem.fileExtensions = (product as EBook | AudioBook).fileExtensions
   return {
      type: ADD_PRODUCT_TO_BOOKSHELF,
      payload: bookshelfItem
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