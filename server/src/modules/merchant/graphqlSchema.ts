import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Merchant {
    guid: String
    logo: String
    dateCreated: String
    publishedState: Boolean
    brands: [Brand]
    merchant: String
    products(skip: Int, limit: Int): [Product]
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
    publishedDate: String
    publishedBy: User
    companyDescription: String
  }

  input MerchantInput {
    logo: String
    publishedState: Boolean
    merchant: String
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
    companyDescription: String
  }
  type Product {
    id: String!
    belongsToBrand: ID!,
    belongsToMerchant: ID!,
    name: String!
    price: Float!
    description: String
    color: String
    size: String
    quantity: Int!
    image: String!
    brand: Brand
    merchant: Merchant
  }
  type User {
    userId: String!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
  }

  type Brand {
    name: String
    merchantId: ID
    merchant: Merchant
  }
  type Query {
    merchants: [Merchant!]!
    products(merchant: ID, sortBy: SortBy, limit: Int, skip: Int): [Product!]!
    brands: [Brand!]!
  }
  type Mutation {
    createMerchant(input: MerchantInput!): Merchant
    editMerchant(publishedState: Boolean!): Merchant
  }

  enum SortBy { 
    merchant
    brand
  }
`;

export { typeDefs };
