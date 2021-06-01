import { combineReducers } from 'redux'
import bookshelfReducer from './bookshelfReducer'
import listPageReducer, { searchResultsListPageReducer } from './listPageReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import isLoadingReducer from './isLoadingReducer'
import searchReducer from './searchReducer'
import openedDialogNameReducer from './openedDialogNameReducer'

const persistConfig = {
   key: 'root',
   storage,
   whiteList: [
      'bookshelf',
      'listPage',
      'isLoading',
      'search',
      'openedDialogName',
   ]
}

const rootReducer = combineReducers({
   bookshelf: bookshelfReducer,
   listPage: listPageReducer,
   searchResultsListPage: searchResultsListPageReducer,
   isLoading: isLoadingReducer,
   search: searchReducer,
   openedDialogName: openedDialogNameReducer
});

export default persistReducer(persistConfig, rootReducer);