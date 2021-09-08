import Product from "../../interfaces-objects/Product"
import { PRODUCTS_SYNC } from "../contants"

export interface ProductsAction {
   type: string,
   payload?: Product[]
}

const productsReducer = (products: Product[] = [], action: ProductsAction) => {
   if (action.type === PRODUCTS_SYNC) return action.payload
   return products
}

export default productsReducer