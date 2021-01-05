import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, INCREASE_QTY, DECREASE_QTY } from "../actions/types";

const initialState = {
  items: {},
  itemsQty: {}
};

const updateCart = (items, newItem) =>{
  let newData;
  if(items[newItem.id]){
    newData = {
      ...items[newItem.id],
      qty: items[newItem.id].qty + 1  
    }
  } else {
    newData = {
      ...newItem,
      qty: 1
    };
  };

  return newData;
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      let newitem = updateCart(state.items, payload);
      return{
        ...state,
        items: {
          ...state.items,
          [newitem.id]: newitem
        }
      };
    case REMOVE_FROM_CART:
      delete state.items[payload.id];
      return{
        ...state,
        items: {
          ...state.items
        }
      };
    case EMPTY_CART:
      return {
        ...state,
        items: {}
      };
    case INCREASE_QTY:
      return{
        ...state,
        items: {
          ...state.items,
          [payload.id]: {
            ...state.items[payload.id],
            qty: state.items[payload.id].qty + 1
          }
        }
      };
    case DECREASE_QTY:
      let updatedData;

      if(state.items[payload.id].qty <= 1){
        delete state.items[payload.id];
        return{
          ...state,
          items: {
            ...state.items,
          }
        };
      } else {
        updatedData = {
          ...state.items[payload.id],
          qty: state.items[payload.id].qty - 1
        };

        return{
          ...state,
          items: {
            ...state.items,
            [payload.id]: updatedData
          }
        };
      };
    default:
      return state;
  };
};