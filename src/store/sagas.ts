import {all} from 'redux-saga/effects';
import productSaga from '../features/products/redux/sagas';

function* rootSaga() {
  yield all([productSaga()]);
}

export default rootSaga;
