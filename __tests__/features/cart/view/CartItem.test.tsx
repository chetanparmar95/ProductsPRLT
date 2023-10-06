
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartItem from '../../../../src/features/cart/view/CartItem';
import { Product } from '../../../../src/types/product';
import { decrementQuantity, incrementQuantity, removeItemFromCart } from '../../../../src/features/products/redux/actions';

const mockStore = configureStore([]);

describe('CartItem Component', () => {
  it('CartItem renders correctly', () => {
    const item: Product = {
      id: 1,
      name: 'Product 1',
      colour: 'black',
      price: 10.0,
      img: 'https://example.com/product1.jpg',
      quantity: 2,
    };
    const store = mockStore({});
    const { toJSON } = render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('CartItem renders values correctly', () => {
    const item: Product = {
      id: 1,
      name: 'Product 1',
      colour: 'black',
      price: 10.0,
      img: 'https://example.com/product1.jpg',
      quantity: 2,
    };
    const store = mockStore({});
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );

    const productName = getByText('Product 1');
    const productPrice = getByText('Price: $10.00');
    const quantityText = getByText('2');
    const decrementButton = getByTestId('decrement');
    const incrementButton = getByTestId('increment');
    
    expect(productName).toBeDefined();
    expect(productPrice).toBeDefined();
    expect(quantityText).toBeDefined();
    expect(decrementButton).toBeDefined();
    expect(incrementButton).toBeDefined();
  });

  it('should dispatch an action when increment button is pressed', () => {
    const item: Product = {
      id: 1,
      name: 'Product 1',
      price: 10.0,
      colour: 'black',
      img: 'https://example.com/product1.jpg',
      quantity: 2,
    };

    const store = mockStore({});

    const { getByText } = render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );

    // Find and click the increment button
    const incrementButton = getByText('+');
    fireEvent.press(incrementButton);

    // Check if the expected action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(incrementQuantity(item.id));
  });

  it('should dispatch an action when decrement button is pressed', () => {
    const item: Product = {
      id: 1,
      name: 'Product 1',
      price: 10.0,
      colour: 'black',
      img: 'https://example.com/product1.jpg',
      quantity: 2,
    };

    const store = mockStore({});

    const { getByText } = render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );

    // Find and click the decrement button
    const decrementButton = getByText('-');
    fireEvent.press(decrementButton);

    // Check if the expected action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(decrementQuantity(item.id));
  });

  it('should dispatch an action when decrement button is pressed', () => {
    const item: Product = {
      id: 1,
      name: 'Product 1',
      price: 10.0,
      colour: 'black',
      img: 'https://example.com/product1.jpg',
      quantity: 1,
    };

    const store = mockStore({});

    const { getByText } = render(
      <Provider store={store}>
        <CartItem item={item} />
      </Provider>
    );

    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);

    // Find and click the decrement button
    const decrementButton = getByText('-');
    fireEvent.press(decrementButton);

    // Check if the expected action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(removeItemFromCart(item.id));

  });
})
