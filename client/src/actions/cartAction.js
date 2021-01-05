import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, INCREASE_QTY, DECREASE_QTY } from "./types";

export const addToCart = (product) => dispatch =>{
  return dispatch({
    type: ADD_TO_CART,
    payload: product
  });
};

export const increasetItemQty = (product) => dispatch =>{
  return dispatch({
    type: INCREASE_QTY,
    payload: product
  });
};

export const decreaseItemQty = (product) => dispatch =>{
  return dispatch({
    type: DECREASE_QTY,
    payload: product
  });
};

export const removeFromCart = (product) => dispatch =>{
  return dispatch({
    type: REMOVE_FROM_CART,
    payload: product
  })
};

export const emptyCart = () => dispatch =>{
  return dispatch({
    type: EMPTY_CART
  });
};