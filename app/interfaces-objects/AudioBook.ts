import Product from './Product'

class AudioBook extends Product {
   constructor(
      _id: string, name: string, description: string, price: number,
      type: string, images: string[],
      public _categoryId: string, public _authorIds: string[], public _publisherId: string, 
      public category: string, public authors: string, public publisher: string, public isbn: string,
      public publicationYear: number, public readBy: string, tags?: string[], flag?: string,
      providenceReview?: string, subtitle?: string, public fileExtensions?: string[],
      public duration?: Date

   ) {
      super(
         _id, name, description, price,
         type, null, null, images,
         subtitle, tags, flag, providenceReview
      )
   }
}

export default AudioBook;