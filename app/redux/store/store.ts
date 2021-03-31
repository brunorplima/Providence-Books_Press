import { createStore } from 'redux'
import persistedRootReducer from '../reducers/rootReducer'
import { persistStore } from 'redux-persist'

export const store = createStore(persistedRootReducer);

export const persistor = persistStore(store);