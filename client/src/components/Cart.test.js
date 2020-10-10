import React from 'react';
import renderer from 'react-test-renderer';
import Context from '../context';
import Cart from './Cart';

describe('Cart', () => {
  it('should render correctly', () => {
    expect(
      renderer.create(
        <Context.Provider value={{
          dispatch: jest.fn(),
          state: {
            productsInCart: [{ id: '1', name: 'test' }]
          },
        }}>
          <Cart />
        </Context.Provider>
      )
    ).toMatchSnapshot();
  });
});