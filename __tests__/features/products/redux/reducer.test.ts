import { addItemToCart, decrementQuantity, fetchProductsFailed, fetchProductsSuccess, incrementQuantity, removeItemFromCart } from '../../../../src/features/products/redux/actions';
import productReducer from '../../../../src/features/products/redux/reducer';
import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_SUCCESS,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from '../../../../src/features/products/redux/types';
import { Product } from '../../../../src/types/product';

const initialState = {
  products: [],
  cartItems: [{ id: 2, name: 'Product 2', quantity: 1, colour: 'black', price: 10, img: '' }],
  error: null,
};

describe('productReducer', () => {
  it('should return the initial state', () => {
    expect(productReducer(initialState, {type: ''})).toEqual(initialState);
  });

  it('should handle FETCH_PRODUCTS_SUCCESS', () => {
    const products: Product[] = [
      { id: 1, name: 'Product 1', quantity: 0, colour: 'black', price: 10, img: '' },
      { id: 2, name: 'Product 2', quantity: 0, colour: 'black', price: 10, img: '' },
    ];
    
    const expectedState = {
      ...initialState,
      products,
    };
    expect(productReducer(initialState, fetchProductsSuccess(products))).toEqual(expectedState);
  });

  it('should handle FETCH_PRODUCTS_FAILED', () => {
    const error = 'Failed to fetch products';
    
    const expectedState = {
      ...initialState,
      error,
    };
    expect(productReducer(initialState, fetchProductsFailed(error))).toEqual(expectedState);
  });

  it('should handle ADD_TO_CART', () => {
    const product: Product = { id: 1, name: 'Product 1', quantity: 1, colour: 'black', price: 10, img: '' };

    const expectedStateNew = {
        ...initialState,
        cartItems: [...initialState.cartItems, product],
    };
    expect(productReducer(initialState, addItemToCart(product))).toEqual(expectedStateNew);
  });

  it('should handle ADD_TO_CART for existing', () => {
    const existing: Product = { id: 2, name: 'Product 2', quantity: 1, colour: 'black', price: 10, img: '' };
    
    const expectedStateExisting = {
      ...initialState,
    //   cartItems: [existing],
    };
    expect(productReducer(initialState, addItemToCart(existing))).toEqual(expectedStateExisting);
  });

  it('should handle REMOVE_FROM_CART', () => {
    const initialStateWithCartItem = {
      ...initialState,
      cartItems: [{ id: 1, name: 'Product 1', quantity: 1, colour: 'black', price: 10, img: '' }],
    };
    const expectedState = {
      ...initialState,
      cartItems: [],
    };
    expect(productReducer(initialStateWithCartItem, removeItemFromCart(1))).toEqual(expectedState);
  });

  it('should handle INCREMENT_QUANTITY', () => {
    const initialStateWithCartItem = {
      ...initialState,
      cartItems: [{ id: 1, name: 'Product 1', quantity: 1, colour: 'black', price: 10, img: '' }],
    };
    const expectedState = {
      ...initialState,
      cartItems: [{ id: 1, name: 'Product 1', quantity: 2, colour: 'black', price: 10, img: '' }],
    };

    const expectedStateDiffId = {
        ...initialState,
        cartItems: [{ id: 1, name: 'Product 1', quantity: 1, colour: 'black', price: 10, img: '' }],
    };
    expect(productReducer(initialStateWithCartItem, incrementQuantity(1))).toEqual(expectedState);
    expect(productReducer(initialStateWithCartItem, incrementQuantity(2))).toEqual(expectedStateDiffId);
  });

  it('should handle DECREMENT_QUANTITY', () => {
    const initialStateWithCartItem = {
      ...initialState,
      cartItems: [{ id: 1, name: 'Product 1', quantity: 2, colour: 'black', price: 10, img: '' }],
    };
    const expectedState = {
      ...initialState,
      cartItems: [{ id: 1, name: 'Product 1', quantity: 1, colour: 'black', price: 10, img: '' }],
    };

    const expectedStateDiffId = {
        ...initialState,
        cartItems: [{ id: 1, name: 'Product 1', quantity: 2, colour: 'black', price: 10, img: '' }],
    };
    expect(productReducer(initialStateWithCartItem, decrementQuantity(1))).toEqual(expectedState);
    expect(productReducer(initialStateWithCartItem, decrementQuantity(2))).toEqual(expectedStateDiffId);
  });
});
