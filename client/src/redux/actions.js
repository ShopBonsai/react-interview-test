import { ADD_TO_CART, REMOVE_FROM_CART, SET_USER_LIKED_PRODUCT, SET_CURRENT_USER } from "./actionTypes";

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: {
        ...product
    }
});

export const removeFromCart = id => ({
    type: REMOVE_FROM_CART,
    payload: { id }
});

export const setLikedProduct = (product) => ({
    type: SET_USER_LIKED_PRODUCT,
    payload: {
        ...product
    }
});

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: {
        ...user
    }
})

