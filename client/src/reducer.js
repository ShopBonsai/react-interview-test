export default function reducer(state, { type, payload }) {
  switch(type) {
    case "ADD_PRODUCT_TO_CART":
      const newProd = payload;
      const prevProds = state.productsInCart.filter(prod => prod.id !== newProd.id);
      return {
        ...state,
        productsInCart: [...prevProds, newProd]
      }
    case "REMOVE_PRODUCT_FROM_CART":
      const prodToRemove = payload;
      const remainingProds = state.productsInCart.filter(product => product.id !== prodToRemove.id);
      return {
        ...state,
        productsInCart: remainingProds
      }
  }
}