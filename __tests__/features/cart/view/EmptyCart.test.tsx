
import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyCart from '../../../../src/features/cart/view/EmptyCart';

describe('EmptyCart Component', () => {
  it('EmptyCart renders correctly', () => {
    const { toJSON } = render(<EmptyCart />);
    expect(toJSON()).toMatchSnapshot();
  });
})
