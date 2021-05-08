import * as types from '../actionTypes';
import { cartCalculator } from './../utils/reducerUtils';
import { IState, IAction } from '../interfaces';

const initialState = {
  merchants: [],
  cart: {
    current: [],
    isOpen: false,
    itemCount: 0,
    subTotal: 0,
  },
};

const shopReducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case types.INIT_PRODUCTS: {
      return {
        ...state,
        merchants: [...state.merchants, ...action.payload],
      };
    }
    case types.ADD_TO_CART: {
      let sameProductAdded = false;
      const { item, stock } = action.payload;
      const cartItemId = item.id;
      const updatedCart = state.cart.current.map((previousItem) => {
        if (previousItem.id === cartItemId) {
          sameProductAdded = true;
          previousItem.selectedQuantity = previousItem.selectedQuantity + item.selectedQuantity;
          if (previousItem.selectedQuantity > stock) {
            previousItem.selectedQuantity = stock;
          }
        }
        return previousItem;
      });
      if (sameProductAdded) {
        const { itemCount, subTotal } = cartCalculator(updatedCart);
        return {
          ...state,
          cart: {
            ...state.cart,
            current: updatedCart,
            itemCount,
            subTotal,
          },
        };
      }
      const { itemCount, subTotal } = cartCalculator([...state.cart.current, item]);
      return {
        ...state,
        cart: {
          ...state.cart,
          current: [...state.cart.current, item],
          itemCount,
          subTotal,
        },
      };
    }
    case types.REMOVE_FROM_CART: {
      const id = action.payload;
      const updatedCart = state.cart.current.filter((previousItem) => {
        return previousItem.id !== id;
      });
      const { itemCount, subTotal } = cartCalculator(updatedCart);
      return {
        ...state,
        cart: {
          ...state.cart,
          current: updatedCart,
          itemCount,
          subTotal,
        },
      };
    }
    case types.TOGGLE_CART: {
      return {
        ...state,
        cart: {
          ...state.cart,
          isOpen: !state.cart.isOpen,
        },
      };
    }
    case types.CHECKOUT_CART: {
      return {
        ...state,
        cart: {
          ...state.cart,
          current: [],
          itemCount: 0,
          subTotal: 0,
        },
      };
    }
    default:
      return state;
  }
};

export default shopReducer;
