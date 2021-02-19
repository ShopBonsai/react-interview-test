const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Merchant {
    index: Int
    guid: String
    logo: String
    dateCreated: String
    publishedState: Boolean
    brands: [String]
    merchant: String
    products: [Product]
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
    publishedDate: String
    publishedBy: User
    companyDescription: String
  }
  type Product {
    belongsToBrand: Int
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image: String
  }
  type User {
    id: String
    name: String
    role: String
    image: String
  }
  type Cart {
    userId: String
    productId: String
    productCount: Int
  }
  type Query {
    merchants: [Merchant!]!
    users: [User!]!
    user(id: String): User
  }
  type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
    cart(userId: String, productId: String, productCount: Int): [Cart]
  }
`;

module.exports = typeDefs;