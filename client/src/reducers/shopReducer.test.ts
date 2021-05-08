import * as types from '../actionTypes';
import shopReducer from './shopReducer';

import { merchants } from '../../../mockMerchantData';

describe('shop reducer', () => {
  let initialState;
  // test item
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

  beforeEach(() => {
    initialState = {
      merchants: [],
      cart: {
        current: [],
        isOpen: false,
        itemCount: 0,
        subTotal: 0,
      },
    };
  });

  afterEach(() => {
    initialState = undefined;
  });

  it('should return initial state', () => {
    expect(shopReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should populate merchants array', () => {
    const newState = { ...initialState, merchants };
    expect(shopReducer(initialState, { type: types.INIT_PRODUCTS, payload: merchants })).toEqual(newState);
  });

  it('should add an item to cart', () => {
    const stock = 1;
    const newState = {
      ...initialState,
      cart: {
        ...initialState.cart,
        current: [item],
        itemCount: 1,
        subTotal: 706.2,
      },
    };
    expect(shopReducer(initialState, { type: types.ADD_TO_CART, payload: { item, stock } })).toEqual(newState);
  });

  it('should add an item to cart', () => {
    const stock = 1;
    const newState = {
      ...initialState,
      cart: {
        ...initialState.cart,
        current: [item],
        itemCount: 1,
        subTotal: 706.2,
      },
    };
    expect(shopReducer(initialState, { type: types.ADD_TO_CART, payload: { item, stock } })).toEqual(newState);
  });

  it('should remove an item from cart', () => {
    const id = '37b4d1b7-ed3c-4d28-91e0-ef0fb89b2b12';
    const newState = {
      ...initialState,
      cart: {
        ...initialState.cart,
        current: [],
        itemCount: 0,
        subTotal: 0,
      },
    };
    expect(shopReducer(initialState, { type: types.REMOVE_FROM_CART, payload: id })).toEqual(newState);
  });

  it('should toggle cart open/close', () => {
    const newState = {
      ...initialState,
      cart: {
        ...initialState.cart,
        isOpen: true,
      },
    };
    expect(
      shopReducer(initialState, {
        type: types.TOGGLE_CART,
      }),
    ).toEqual(newState);
  });

  it('should toggle cart open/close', () => {
    const newState = {
      ...initialState,
      cart: {
        ...initialState.cart,
        isOpen: true,
      },
    };
    expect(
      shopReducer(initialState, {
        type: types.TOGGLE_CART,
      }),
    ).toEqual(newState);
  });

  it('should checkout and clear cart state', () => {
    expect(
      shopReducer(initialState, {
        type: types.CHECKOUT_CART,
      }),
    ).toEqual(initialState);
  });
});
