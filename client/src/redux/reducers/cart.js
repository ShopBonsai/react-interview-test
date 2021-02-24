import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes";

const initialState = {
    byIds: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: {
            const { product, quantity } = action.payload;
            const { id } = product
            const prevQuantity = state.byIds[id] ? state.byIds[id].newQuantity : 0
            const newQuantity = Number(prevQuantity + quantity)
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        product,
                        newQuantity
                    }
                }
            };
        }
        case REMOVE_FROM_CART: {
            const { id } = action.payload;
            const byIds = Object.values(state.byIds).reduce((acc, curr) => {
                if(curr.product.id !== id) {
                    const { product , newQuantity } = curr
                    acc = {
                        [curr.product.id]: {
                            product,
                            newQuantity
                        }
                    }
                }
                return acc
            }, {})
            return {
                ...state,
                byIds: {
                    ...byIds
                }
            };
        }
        default:
            return state;
    }
}
