const { merchants } = require("../../../mockMerchantData")

// TODO: Move cart to a database
const cart = []

// HELPERS
const calculateCartItems = (cart) => 
  cart.reduce((acc, curr) => acc + curr.quantity, 0)

const addToCartService = (productToAdd) => {
  const indexOfExistingProduct = cart.findIndex(item => item.id === productToAdd.id);

  if(indexOfExistingProduct < 0) {
    cart.push(productToAdd);
  } else {
    const product = cart[indexOfExistingProduct];
    product.quantity = product.quantity + productToAdd.quantity;
    cart[indexOfExistingProduct] = product;
  }
}

const resolvers = {
  Query: {
    merchants: () => merchants
  },
  Mutation: {
    addToCart: (_, { product }) => {
      addToCartService(product);
      return {
        success: true,
        message: `Successfully added ${product.quantity} products to the cart.`,
        totalNumberOfCartItems: calculateCartItems(cart)
      }
    }
  }
};

module.exports = resolvers;