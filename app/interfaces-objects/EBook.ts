import Product from './Product'

class EBook extends Product {
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
      public fileExtensions: string[],
      tags?: string[],
      flag?: string,
      providenceReview?: string,
      subtitle?: string,
      public numberPages?: number,
      public subject?: string,
      public age?: string
   ) {
      super(_id, name, description, price, 'E-book', 
         images, _categoryId, category, subtitle, tags, flag, providenceReview   
      );
      
   }
}

export default EBook;