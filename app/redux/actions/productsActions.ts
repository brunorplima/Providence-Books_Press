import Product from "../../interfaces-objects/Product";
import { PRODUCTS_SYNC } from "../contants";
import { ProductsAction } from "../reducers/productsReducer";

export const productsFetchAction = (products: Product[]): ProductsAction => {
   return {
      type: PRODUCTS_SYNC,
      payload: products
   }
}