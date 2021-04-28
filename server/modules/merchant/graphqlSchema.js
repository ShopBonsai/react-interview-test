const { gql } = require('apollo-server-express');

/*
 * 🚨
 * PROBLEM.
 * NOTE: There is a problem as the items in the database are visually described differently
 * ie. [dateCreated => created_at], [publishedState => published_state]
 */
const typeDefs = gql`
  type Merchant {
    id: Int
    index_val: Int
    guid: String
    logo: String
    created_at: String
    published_state: Boolean
    brands: [String]
    merchant_name: String
    products: [Product]
    commission_fee: String
    contact_email: String
    phone: String
    address: String
    published_date: String
    publishedBy: User
    description: String
  }
  type Product {
    id: Int
    original_id: String
    brand_id: Int
    product_name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image_url: String
  }
  type User {
    id: String
  }
  type Query {
    merchants: [Merchant!]!
    findMerchant(id: Int!): Merchant
    findProduct(id: Int!, user_id: String): Product
    getAllProductsInCart(user_id: String!): [Product]!
    findUser(username: String!): User
  }
  # type UserCart {
  #   id: Int
  #   products: [Product]!
  # }
  type Mutation {
    addToCart(user_id: String!, product_id: Int, quantity: Int): [Product]!
  }
`;

module.exports = typeDefs;
