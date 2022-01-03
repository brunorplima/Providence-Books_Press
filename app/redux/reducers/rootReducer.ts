import { combineReducers } from 'redux'
import bookshelfReducer from './bookshelfReducer'
import listPageReducer, { searchResultsListPageReducer } from './listPageReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import isLoadingReducer from './isLoadingReducer'
import searchReducer from './searchReducer'
import openedDialogNameReducer from './openedDialogNameReducer'
import productsLastSyncReducer from './productsLastSyncReducer'
import productsReducer from './productsReducer'
import articlesReducer from './articlesReducer'
import articlesLastSyncReducer from './articlesLastSyncReducer'
import Product from '../../interfaces-objects/Product'
import { Article, BookshelfItem } from '../../interfaces-objects/interfaces'
import lastActiveTimeReducer from './lastActiveTimeReducer'

const persistConfig = {
   key: 'root',
   storage,
   whiteList: [
      'bookshelf',
      'listPage',
      'isLoading',
      'search',
      'openedDialogName',
      'productsLastSync',
      'articlesLastSync',
      'products',
      'articles',
      'lastActiveTime'
   ]
}

export interface ReduxState {
   bookshelf: BookshelfItem[];
   listPage: number;
   searchResultsListPage: number;
   isLoading: boolean;
   search: string;
   openedDialogName: string;
   productsLastSync: number;
   articlesLastSync: number;
   products: Product[];
   articles: Article[];
   lastActiveTime: number;
}

const rootReducer = combineReducers<ReduxState>({
   bookshelf: bookshelfReducer,
   listPage: listPageReducer,
   searchResultsListPage: searchResultsListPageReducer,
   isLoading: isLoadingReducer,
   search: searchReducer,
   openedDialogName: openedDialogNameReducer,
   productsLastSync: productsLastSyncReducer,
   articlesLastSync: articlesLastSyncReducer,
   products: productsReducer,
   articles: articlesReducer,
   lastActiveTime: lastActiveTimeReducer
});

export default persistReducer(persistConfig, rootReducer);