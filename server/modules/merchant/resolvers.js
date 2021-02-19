const { ProductController } = require("./ProductController");

const { merchants } = require("../../../mockMerchantData");
const { users } = require("../../../mockUserData");

const productController = new ProductController();

const resolvers = {
  Query: {
    merchants: () => merchants,
    users: () => users,
    user: (_, params) => (users.find((user) => user.id === params.id)),
  },
  Mutation: {
    cart: (_, params) => productController.addToCart(params.userId, params.productId, params.productCount),
  },
};

module.exports = resolvers;