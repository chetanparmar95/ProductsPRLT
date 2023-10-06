import { call, put } from 'redux-saga/effects';
import ProductServices from '../../../../src/services/products';
import { fetchProducts } from '../../../../src/features/products/redux/sagas';
import { fetchProductsFailed, fetchProductsSuccess } from '../../../../src/features/products/redux/actions';

describe('fetchProducts Saga', () => {
  it('should dispatch FETCH_PRODUCTS_SUCCESS on success', () => {
    const generator = fetchProducts();
    const mockResponse = { data: [{ id: 1, name: 'Product 1', quantity: 1, colour: 'black', price: 10, img: '' }] };

    const getProductsMock = jest.spyOn(ProductServices, 'getProducts').mockResolvedValue(mockResponse);

    const firstYield = generator.next();

    expect(firstYield.value).toEqual(call(ProductServices.getProducts));

    const secondYield = generator.next(mockResponse);

    expect(secondYield.value).toEqual(put(fetchProductsSuccess(mockResponse.data)));

    const done = generator.next();

    expect(done.done).toBeTruthy();

    getProductsMock.mockRestore();
  });

  it('should dispatch FETCH_PRODUCTS_FAILED on error', () => {
    const generator = fetchProducts();
    const error = new Error('Failed to fetch products');

    const getProductsMock = jest.spyOn(ProductServices, 'getProducts').mockRejectedValue(error);

    const firstYield = generator.next();

    expect(firstYield.value).toEqual(call(ProductServices.getProducts));

    const secondYield = generator.throw(error);

    expect(secondYield.value).toEqual(put(fetchProductsFailed(error)));

    const done = generator.next();

    expect(done.done).toBeTruthy();

    getProductsMock.mockRestore();
  });
});
