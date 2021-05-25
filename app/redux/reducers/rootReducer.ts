import { combineReducers } from 'redux'
import bookshelfReducer from './bookshelfReducer'
import listPageReducer from './listPageReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import isLoadingReducer from './isLoadingReducer'

const persistConfig = {
   key: 'root',
   storage,
   whiteList: ['bookshelf', 'listPage', 'isLoading']
}

const rootReducer = combineReducers({
   bookshelf: bookshelfReducer,
   listPage: listPageReducer,
   isLoading: isLoadingReducer
});

export default persistReducer(persistConfig, rootReducer);