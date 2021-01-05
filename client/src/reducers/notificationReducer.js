import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from "../actions/types";

const initialState = {
  messages: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_NOTIFICATION:
      return{
        ...state,
        messages: [payload]
      };
    case CLEAR_NOTIFICATION:
      return{
        ...state,
        messages: []
      };
    default:
      return state;
  };
};