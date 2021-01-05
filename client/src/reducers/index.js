import {combineReducers} from 'redux';
import cart from "./cartReducer";
import notification from "./notificationReducer";

export default combineReducers({
  cart,
  notification,
});