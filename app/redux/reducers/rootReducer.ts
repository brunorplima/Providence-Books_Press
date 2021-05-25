import { combineReducers } from 'redux'
import bookshelfReducer from './bookshelfReducer'
import listPageReducer from './listPageReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import isLoadingReducer from './isLoadingReducer'
import searchReducer from './searchReducer'

const persistConfig = {
   key: 'root',
   storage,
   whiteList: ['bookshelf', 'listPage', 'isLoading', 'search']
}

const rootReducer = combineReducers({
   bookshelf: bookshelfReducer,
   listPage: listPageReducer,
   isLoading: isLoadingReducer,
   search: searchReducer
});

export default persistReducer(persistConfig, rootReducer);