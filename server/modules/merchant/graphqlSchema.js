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
  type ProductDetail {
      name: String
      price: Float
      color: String
      size: String
      brand: String
  }
  type User {
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    likes: [String!]!
  }
  type LikedProduct {
    isLiked: Boolean
  }
  type Query {
    merchants: [Merchant!]!
    user(userId: String!): User
    productById(productId: String): ProductDetail
  }
  type Mutation {
    setLikedItem(userId: String!, productId: String!): LikedProduct
    editMerchant(publishedState: Boolean!): Merchant
  }
  
`;

module.exports = typeDefs;
