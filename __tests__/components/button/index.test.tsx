
import React from 'react';
import { render } from '@testing-library/react-native';
import Button from '../../../src/components/button'

describe('Button Component', () => {
  it('Button renders correctly', () => {
    const { toJSON } = render(<Button title="Click me" titleStyle={{color: 'black'}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders button with provided title', () => {
    const { getByText } = render(<Button title="Click me" />);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeDefined();
  });
})
