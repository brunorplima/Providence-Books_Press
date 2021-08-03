import { UPDATE_PRODUCTS_LAST_SYNC } from "../contants"

export interface ProductsLastSyncAction {
   readonly type: string
   readonly payload: number
}

const productsLastSyncReducer = (lastSync = 0, action: ProductsLastSyncAction) => {
   if (action.type === UPDATE_PRODUCTS_LAST_SYNC) return action.payload
   return lastSync
}

export default productsLastSyncReducer