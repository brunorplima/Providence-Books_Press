import { BookshelfItem } from '../../interfaces-objects/interfaces'
import { ADD_PRODUCT_TO_BOOKSHELF, REMOVE_ALL_FROM_BOOKSHELF, REMOVE_SOME_FROM_BOOKSHELF } from '../contants'

type Action = {
   type: string,
   payload?: BookshelfItem | BookshelfItem[]
}

const bookshelfReducer = (state: BookshelfItem[] = [], action: Action) => {
   switch (action.type) {
      case ADD_PRODUCT_TO_BOOKSHELF:
         return [...state, action.payload];
      case REMOVE_SOME_FROM_BOOKSHELF:
         const ids = (action.payload as BookshelfItem[]).map(item => item.id);
         return state.filter(item => !ids.includes(item.id));
      case REMOVE_ALL_FROM_BOOKSHELF:
         return [];
      default:
         return state;
   }
}

export default bookshelfReducer;