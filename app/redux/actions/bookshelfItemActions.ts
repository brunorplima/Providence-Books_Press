import { CHANGE_CHECK, DECREASE_QUANTITY, INCREASE_QUANTITY } from "../contants"

export const createChangeCheckAction = (id: string) => {
   return {
      type: CHANGE_CHECK,
      payload: id
   }
}

export const createIncreaseQuantityAction = (id: string) => {
   return { 
      type: INCREASE_QUANTITY,
      payload: id
   }
}

export const createDecreaseQuantityAction = (id: string) => {
   return { 
      type: DECREASE_QUANTITY,
      payload: id
   }
}