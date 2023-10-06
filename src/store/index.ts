import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import productReducer from '../features/products/redux/reducer'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const rootReducer = combineReducers({
    products: productReducer,
});

// Mount it on the Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
})

// Then run the saga
sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export default store;