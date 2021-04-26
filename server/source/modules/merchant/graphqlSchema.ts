export {};

const { gql } = require("apollo-server-express");

export const typeDefs = gql`
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
    userId: String
  }
  type PageAccess {
    loadTime: Int
    viewCount: Int
  }
  type DatabaseAccess {
    loadTime: Int
    accessCount: Int
  }
  type Purchase {
    products: [Product]
    price: Float
  }
  type Query {
    getAnalyticsData(full: Boolean): String
    merchants: [Merchant!]!
  }
  input ProductInput {
    belongsToBrand: Int
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image: String
    merchant: Int!
  }  
  input PurchaseInput {
    products: [ProductInput]
    price: Float
  }
  type Mutation {
    editMerchant(index: Int!, publishedState: Boolean!): Merchant
    addPageVisit(loadTime: Int!): PageAccess
    addDatabaseAccess(loadTime: Int!): DatabaseAccess
    updateProducts(products: [ProductInput]!): [Merchant]
    makePurchase(purchase: PurchaseInput!): Purchase
  }
`;
