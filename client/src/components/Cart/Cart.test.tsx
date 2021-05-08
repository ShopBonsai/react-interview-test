import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import Cart from '.';

describe('Cart Component', () => {
  let cartComponent;

  beforeEach(() => {
    cartComponent = () => (
      <Provider store={store}>
        <Cart />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    render(cartComponent());
  });

  it('cart header renders with correct text', () => {
    const { getByText } = render(cartComponent());
    getByText(/^Cart subtotal: \$0/);
  });

  it('should not checkout when checkout button is disabled', () => {
    const cart = render(cartComponent());
    const checkoutButton = cart.getByText(/^Checkout/);
    expect(checkoutButton).toHaveAttribute('disabled');
  });
});
