
import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartScreen from '../../../src/features/cart';

const mockStore = configureStore([]);

describe('CartScreen Component', () => {
  it('CartScreen renders correctly', () => {
    const store = mockStore({
        products: {
          cartItems: [],
        },
    });
    const { toJSON } = render(
        <Provider store={store}>
            <CartScreen />
        </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders CartScreen with empty cart', () => {
    const store = mockStore({
      products: {
        cartItems: [],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    const emptyCartText = getByText('Your cart is empty');
    expect(emptyCartText).toBeDefined();
  });

  it('renders CartScreen with cart items', () => {
    const store = mockStore({
      products: {
        cartItems: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            quantity: 2,
            colour: "Black",
            img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024"
          },
          {
            id: 2,
            name: 'Product 2',
            price: 15.0,
            quantity: 1,
            colour: "Black",
            img: "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024"
          },
        ],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    const product1Text = getByText('Product 1');
    const product2Text = getByText('Product 2');
    const totalText = getByText('Total: $35.00');

    expect(product1Text).toBeDefined();
    expect(product2Text).toBeDefined();
    expect(totalText).toBeDefined();
  });
})
