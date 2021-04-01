import { BookshelfItem } from '../../interfaces-objects/interfaces'
import {
   ADD_PRODUCT_TO_BOOKSHELF,
   REMOVE_ALL_FROM_BOOKSHELF,
   REMOVE_SOME_FROM_BOOKSHELF,
   CHANGE_CHECK,
   INCREASE_QUANTITY,
   DECREASE_QUANTITY
} from '../contants'

type Action = {
   type: string,
   payload?: BookshelfItem | BookshelfItem[] | string
}

const bookshelfReducer = (state: BookshelfItem[] = [], action: Action) => {

   const stateClone = [...state];

   switch (action.type) {
      case ADD_PRODUCT_TO_BOOKSHELF:
         return [...state, action.payload];

      case REMOVE_SOME_FROM_BOOKSHELF:
         const ids = (action.payload as BookshelfItem[]).map(item => item.id);
         return state.filter(item => !ids.includes(item.id));

      case REMOVE_ALL_FROM_BOOKSHELF:
         return [];

      case CHANGE_CHECK:
         return changeCheck(stateClone, action);

      case INCREASE_QUANTITY:
         return increase(stateClone, action);

      case DECREASE_QUANTITY:
         return decrease(stateClone, action);

      default:
         return state;
   }
}


const changeCheck = (stateClone: BookshelfItem[], action: Action) => {
   const updatedList = stateClone.map(item => {
      if (item.id === action.payload)
         item.isChecked = !item.isChecked;
      return item;
   })
   return updatedList;
}


const increase = (stateClone: BookshelfItem[], action: Action) => {
   const updatedList = stateClone.map(item => {
      if (item.id === action.payload)
         item.quantity++;
      return item;
   });
   return updatedList;
}


const decrease = (stateClone: BookshelfItem[], action: Action) => {
   const foundItem = stateClone.find(item => item.id === action.payload);
   let updatedList;
   if (foundItem.quantity > 1) {
      updatedList = stateClone.map(item => {
         if (item.id === action.payload)
            item.quantity--;
         return item;
      });
      return updatedList;
   } else {
      return stateClone.filter(item => item.id !== action.payload);
   }
}

export default bookshelfReducer;