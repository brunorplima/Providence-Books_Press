import { ProductLink } from "./interfaces";

abstract class Product {

   constructor(
      public _id: string, public name: string, public description: string, public price: number,
      public type: string, public images: string[], public _categoryId: string, public category: string, public subtitle?: string, public tags?: string[], public flag?: string, public providenceReview?: string, public links?: ProductLink[]
   ) {
   }
}

export default Product