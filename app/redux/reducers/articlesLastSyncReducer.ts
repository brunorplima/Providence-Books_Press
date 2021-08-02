import { UPDATE_ARTICLES_LAST_SYNC } from "../contants";

export interface ArticlesLastSyncAction {
   readonly type: typeof UPDATE_ARTICLES_LAST_SYNC,
   readonly payload: number
}

const articlesLastSyncReducer = (lastSync = 0, action: ArticlesLastSyncAction) => {
   if (action.type === UPDATE_ARTICLES_LAST_SYNC) return action.payload
   return lastSync
}

export default articlesLastSyncReducer