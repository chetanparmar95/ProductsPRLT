import { call, put, takeLatest } from 'redux-saga/effects'
import ProductServices from '../../../services/products';
import { fetchProductsFailed, fetchProductsSuccess } from './actions';
import { FETCH_PRODUCTS } from './types';

// exporting for UT purpose
export function* fetchProducts(): Generator<any> {
   try {
      const response: any = yield call(ProductServices.getProducts);
      yield put(fetchProductsSuccess(response.data));
   } catch (e: any) {
      yield put(fetchProductsFailed(e));
   }
}

function* productSaga() {
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}

export default productSaga;