
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductList from '../../../src/features/products';

const mockStore = configureStore([]);
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('ProductList Component', () => {
  it('ProductList renders correctly', () => {
    const store = mockStore({
        products: {
          products: [
            {
              id: 1,
              name: 'Product 1',
              price: 10.0,
              quantity: 0,
              colour: "Black",
              img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024"
            },
            {
              id: 2,
              name: 'Product 2',
              price: 15.0,
              quantity: 0,
              colour: "Black",
              img: "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024"
            },
          ],
          cartItems: []
        },
    });
    const { toJSON, getByText } = render(
        <Provider store={store}>
            <ProductList />
        </Provider>
    );
    expect(toJSON()).toMatchSnapshot();

    const product1Text = getByText('Product 1');
    const product2Text = getByText('Product 2');

    expect(product1Text).toBeDefined();
    expect(product2Text).toBeDefined();
  });

  it('Check if cart button navigate to cart screen', () => {
    const store = mockStore({
      products: {
        products: [
          {
            id: 1,
            name: 'Product 1',
            price: 10.0,
            quantity: 0,
            colour: "Black",
            img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024"
          },
          {
            id: 2,
            name: 'Product 2',
            price: 15.0,
            quantity: 0,
            colour: "Black",
            img: "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024"
          },
        ],
        cartItems: []
      },
    });
    const { getByText } = render(
        <Provider store={store}>
            <ProductList />
        </Provider>
    );
    const cartButton = getByText('0 item in Cart');
    fireEvent.press(cartButton)
    expect(mockedNavigate).toHaveBeenCalledTimes(1)
  });
})
