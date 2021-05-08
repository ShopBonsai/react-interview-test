import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import CartItem from '.';

describe('CartItem Component', () => {
  const click = jest.fn();
  let cartItemComponent;

  beforeEach(() => {
    cartItemComponent = () => (
      <CartItem
        id="37b4d1b7-ed3c-4d28-91e0-ef0fb89b2b12"
        image="https://picsum.photos/300/?random"
        name="VENIAM Swimming Shorts"
        price={706.2}
        selectedQuantity={1}
        removeItemFromCart={click}
      />
    );
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    render(cartItemComponent());
  });

  it('props work', () => {
    const { getByText } = render(cartItemComponent());
    getByText(/^VENIAM Swimming Shorts/);
    getByText(/^\$706.2/);
    getByText(/^QTY: 1/);
  });

  it('mock function to removeItem', () => {
    const { getByText } = render(cartItemComponent());
    const removeFromCart = getByText(/^Remove/);
    fireEvent.click(removeFromCart);
    expect(click).toBeCalled();
  });
});
