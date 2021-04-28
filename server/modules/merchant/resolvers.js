const { merchants } = require('../../../mockMerchantData');
const { GraphQLID, GraphQLString } = require('graphql');

const {
  GET_ALL_MERCHANTS,
  GET_MERCHANT_PRODUCTS,
  FIND_MERCHANT,
} = require('../Queries/Merchant');

const { FIND_PRODUCT } = require('../Queries/Product');
const { GET_ALL_PRODUCTS_IN_CART } = require('../Queries/UserCart.ts');
const { ADD_TO_CART } = require('../Mutations/UserCart.ts');
const { FIND_USER } = require('../Queries/User.ts');

// Merchants
const resolvers = {
  Query: {
    merchants: GET_ALL_MERCHANTS,
    findMerchant: FIND_MERCHANT,
    getAllProductsInCart: GET_ALL_PRODUCTS_IN_CART,
    findProduct: FIND_PRODUCT,
    findUser: FIND_USER,
  },
  Mutation: {
    addToCart: ADD_TO_CART,
  },
  Merchant: {
    products: GET_MERCHANT_PRODUCTS,
  },
};

module.exports = resolvers;
