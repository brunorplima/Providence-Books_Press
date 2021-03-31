import { combineReducers } from 'redux'
import bookshelfReducer from './bookshelfReducer'
import listPageReducer from './listPageReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
   key: 'root',
   storage,
   whiteList: ['bookshelf']
}

const rootReducer = combineReducers({
   bookshelf: bookshelfReducer,
   listPage: listPageReducer
});

export default persistReducer(persistConfig, rootReducer);