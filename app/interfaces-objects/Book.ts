import Product from './Product'

class Book extends Product {

   constructor(
      _id: string,
      name: string,
      description: string,
      price: number,
      images: string[],
      _categoryId: string,
      category: string,
      public _authorIds: string[],
      public _publisherId: string, 
      public authors: string,
      public publisher: string,
      public isbn: string,
      public weight: number,
      public stock: number,
      tags?: string[],
      flag?: string,
      providenceReview?: string,
      subtitle?: string,
      public numberPages?: number,
      public subject?: string,
      public age?: string,
      public coverType?: string
   ) {
      super(
         _id, name, description, price,
         'Book', images, _categoryId, category,
         subtitle, tags, flag, providenceReview
      );
   }
}

export default Book;