import { ProductLink } from './interfaces';
import Product from './Product'

class AudioBook extends Product {
   constructor(
      _id: string,
      name: string,
      description: string,
      price: number,
      images: string[],
      _categoryId: string,
      public _authorIds: string[],
      public _publisherId: string, 
      category: string,
      public authors: string,
      public publisher: string,
      public isbn: string,
      public readBy: string,
      tags?: string[],
      flag?: string,
      providenceReview?: string,
      subtitle?: string,
      public fileExtensions?: string[],
      public duration?: string,
      public subject?: string,
      public age?: string,
      links?: ProductLink[]

   ) {
      super(
         _id, name, description, price,
         'Audio book', images, _categoryId, category,
         subtitle, tags, flag, providenceReview, links
      )
   }
}

export default AudioBook;