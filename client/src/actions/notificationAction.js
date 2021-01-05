import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from "./types";

export const setNotification = (message) => dispatch =>{
  dispatch({
    type: SET_NOTIFICATION,
    payload: message
  });

  setTimeout(() => dispatch({
    type: CLEAR_NOTIFICATION,
    payload: []
  }), 4000);
};

export const clearNotification = () => dispatch =>{
  dispatch({
    type: CLEAR_NOTIFICATION,
    payload: []
  });
};