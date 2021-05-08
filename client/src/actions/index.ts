import * as types from '../actionTypes';

export const initializeProducts = (merchants) => ({
  type: types.INIT_PRODUCTS,
  payload: merchants,
});

export const addToCart = (item, stock) => ({
  type: types.ADD_TO_CART,
  payload: {
    item,
    stock,
  },
});

export const removeFromCart = (id) => ({
  type: types.REMOVE_FROM_CART,
  payload: id,
});

export const toggleCart = () => ({
  type: types.TOGGLE_CART,
});

export const checkoutCart = () => ({
  type: types.CHECKOUT_CART,
});
