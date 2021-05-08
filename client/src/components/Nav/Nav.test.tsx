import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Nav from '.';

describe('Nav Component', () => {
  let navComponent;

  beforeEach(() => {
    navComponent = () => (
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    render(navComponent());
  });

  it('should toggleCart to true when clicked', () => {
    const { getByText } = render(navComponent());
    const cartButton = getByText(/^Cart/);
    fireEvent.click(cartButton);
    expect(store.getState().shop.cart.isOpen).toBe(true);
  });
});
