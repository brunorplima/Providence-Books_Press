import { CHANGE_LIST_PAGE, SEARCH_RESULTS_LIST_PAGE } from "../contants";

export interface ListPageAction {
   readonly type: typeof CHANGE_LIST_PAGE | typeof SEARCH_RESULTS_LIST_PAGE;
   readonly payload: number;
}


export const createChangeListPageAction = (page: number): ListPageAction => {
   return {
      type: CHANGE_LIST_PAGE,
      payload: page
   }
}

export const createSearchResultsListPageAction = (page: number): ListPageAction => {
   return {
      type: SEARCH_RESULTS_LIST_PAGE,
      payload: page
   }
}