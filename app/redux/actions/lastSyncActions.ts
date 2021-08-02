import { UPDATE_ARTICLES_LAST_SYNC, UPDATE_PRODUCTS_LAST_SYNC } from "../contants"
import { ArticlesLastSyncAction } from "../reducers/articlesLastSyncReducer"
import { ProductsLastSyncAction } from "../reducers/productsLastSyncReducer"

export const updateProductsLastSyncAction = (timeMill: number): ProductsLastSyncAction => {
   return {
      type: UPDATE_PRODUCTS_LAST_SYNC,
      payload: timeMill
   }
}

export const updateArticlesLastSyncAction = (timeMill: number): ArticlesLastSyncAction => {
   return {
      type: UPDATE_ARTICLES_LAST_SYNC,
      payload: timeMill
   }
}