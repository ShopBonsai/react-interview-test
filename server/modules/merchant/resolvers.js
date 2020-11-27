const { merchants } = require("../../../mockMerchantData")

const cart = [];

const resolvers = {
  Query: {
    merchants: () => merchants,
    cart: () => cart,
  },
  Mutation: {
    addToCart: (parent, args) => {
      //! Validation is being skipped at this time

      //! The database only persists information for the duration of the app life at this time
      const { productId } = args;
      const existingCartProduct = cart.find(cartProduct => cartProduct.productId === productId);
      if (existingCartProduct) {
        existingCartProduct.quantity += 1;
        return existingCartProduct;
      }

      const newCartProduct = {
        quantity: 1,
        ...args,
      };
      cart.push(newCartProduct);

      return newCartProduct;
    },
  },
};

module.exports = resolvers;