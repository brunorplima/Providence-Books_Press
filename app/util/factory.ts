import AudioBook from "../interfaces-objects/AudioBook";
import Book from "../interfaces-objects/Book";
import { AUDIO_BOOK_TYPE, BOOK_TYPE, E_BOOK_TYPE } from "../interfaces-objects/constants";
import EBook from "../interfaces-objects/EBook";
import { BookType } from "../interfaces-objects/interfaces";
import Product from "../interfaces-objects/Product";


export const buildProduct = (p: Book & EBook & AudioBook) => {
   switch (p.type) {
      case 'Book':
         const book: Book = {
            _id: p._id,
            type: BOOK_TYPE,
            name: p.name,
            description: p.description,
            price: p.price,
            images: p.images,
            _categoryId: p._categoryId,
            category: p.category,
            _authorIds: p._authorIds,
            _publisherId: p._publisherId,
            authors: p.authors,
            publisher: p.publisher,
            isbn: p.isbn,
            weight: p.weight,
            stock: p.stock,
            tags: p.tags,
            flag: p.flag,
            providenceReview: p.providenceReview,
            subtitle: p.subtitle,
            numberPages: p.numberPages,
            subject: p.subject,
            age: p.age,
            coverType: p.coverType,
            links: p.links
         }
         return book
      case 'E-book':
         const ebook: EBook = {
            _id: p._id,
            type: E_BOOK_TYPE,
            name: p.name,
            description: p.description,
            price: p.price,
            images: p.images,
            _categoryId: p._categoryId,
            _authorIds: p._authorIds,
            _publisherId: p._publisherId,
            category: p.category,
            authors: p.authors,
            publisher: p.publisher,
            isbn: p.isbn,
            fileExtensions: p.fileExtensions,
            tags: p.tags,
            flag: p.flag,
            providenceReview: p.providenceReview,
            subtitle: p.subtitle,
            numberPages: p.numberPages,
            subject: p.subject,
            age: p.age,
            links: p.links
         }
         return ebook
      case 'Audio book':
         const audioBook: AudioBook = {
            _id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            images: p.images,
            _categoryId: p._categoryId,
            _authorIds: p._authorIds,
            _publisherId: p._publisherId,
            category: p.category,
            publisher: p.publisher,
            authors: p.authors,
            isbn: p.isbn,
            readBy: p.readBy,
            tags: p.tags,
            flag: p.flag,
            providenceReview: p.providenceReview,
            subject: p.subtitle,
            fileExtensions: p.fileExtensions,
            duration: p.duration,
            subtitle: p.subtitle,
            age: p.age,
            links: p.links,
            type: AUDIO_BOOK_TYPE
         }
         return audioBook
   }
}