import Product from './Product'

class Book extends Product {

   constructor(
      _id: string,
      name: string,
      description: string,
      price: number,
      images: string[],
      public _categoryId: string,
      public _authorIds: string[],
      public _publisherId: string, 
      public category: string,
      public authors: string,
      public publisher: string,
      public isbn: string,
      public publicationYear: number,
      public weight: string,
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
         'Book', images,
         subtitle, tags, flag, providenceReview
      );
   }
}

export default Book;