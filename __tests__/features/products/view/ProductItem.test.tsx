
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductItem from '../../../../src/features/products/view/ProductItem';
import { Product } from '../../../../src/types/product';
import { addItemToCart } from '../../../../src/features/products/redux/actions';

const mockStore = configureStore([]);

describe('ProductItem Component', () => {
  it('ProductItem renders correctly', () => {
    const item: Product = {
      id: 2,
      name: 'Product 2',
      price: 15.0,
      quantity: 0,
      colour: "Black",
      img: "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024"
    }
    const store = mockStore({});

    const { toJSON } = render(
      <Provider store={store}>
        <ProductItem item={item} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should dispatch an action when add to cart button is pressed', () => {
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
        <ProductItem item={item} />
      </Provider>
    );

    // Find and click the decrement button
    const addButton = getByText('Add to Cart');
    fireEvent.press(addButton);

    // Check if the expected action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(addItemToCart(item));
  });
})
