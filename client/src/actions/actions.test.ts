import * as types from '../actionTypes';
import * as actions from '.';

import merchants from '../../../mockMerchantData';

describe('actions', () => {
  it('should create an action to initialize our merchants', () => {
    const expectedAction = {
      type: types.INIT_PRODUCTS,
      payload: merchants,
    };
    expect(actions.initializeProducts(merchants)).toEqual(expectedAction);
  });

  it('should create an action to add item to cart', () => {
    const item = {
      color: 'deserunt',
      description: 'Excepteur non Lorem aliqua esse irure veniam elit, labore culpa velit nostrud ad nostrud.',
      id: '37b4d1b7-ed3c-4d28-91e0-ef0fb89b2b12',
      image: 'https://picsum.photos/300/?random',
      name: 'VENIAM Swimming Shorts',
      price: 706.2,
      selectedQuantity: 1,
      size: 'L',
    };
    const stock = 1;
    const expectedAction = {
      type: types.ADD_TO_CART,
      payload: {
        item,
        stock,
      },
    };
    expect(actions.addToCart(item, stock)).toEqual(expectedAction);
  });

  it('should create an action to remove an item', () => {
    const id = '2f52b545-e60d-443c-a742-7dad12238df1';
    const expectedAction = {
      type: types.REMOVE_FROM_CART,
      payload: id,
    };
    expect(actions.removeFromCart(id)).toEqual(expectedAction);
  });

  it('should create an action to toggle cart open/close', () => {
    const expectedAction = {
      type: types.TOGGLE_CART,
    };
    expect(actions.toggleCart()).toEqual(expectedAction);
  });

  it('should create an action to checkout cart', () => {
    const expectedAction = {
      type: types.CHECKOUT_CART,
    };
    expect(actions.checkoutCart()).toEqual(expectedAction);
  });
});
