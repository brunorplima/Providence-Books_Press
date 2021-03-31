import { CHANGE_LIST_PAGE } from "../contants"


export const createChangeListPageAction = (page: number) => {
   return {
      type: CHANGE_LIST_PAGE,
      payload: page
   }
}