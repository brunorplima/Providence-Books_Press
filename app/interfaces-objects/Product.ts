
abstract class Product {

   constructor(
      public _id, public name: string, public description: string, public price: number,
      public type: string, public weight: string, public stock: number, public images: string[],
      public subtitle?: string, public tags?: string[], public flag?: string, public providenceReview?: string
      ) {
   }
}

export default Product