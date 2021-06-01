import { ListPageAction } from "../actions/listPageActions";
import { CHANGE_LIST_PAGE, SEARCH_RESULTS_LIST_PAGE } from "../contants";


const listPageReducer = (state: number = 1, action: ListPageAction) => {
   if (action.type === CHANGE_LIST_PAGE) return action.payload;
   return state;
}

export const searchResultsListPageReducer = (state: number = 1, action: ListPageAction) => {
   if (action.type === SEARCH_RESULTS_LIST_PAGE) return action.payload;
   return state;
}

export default listPageReducer;