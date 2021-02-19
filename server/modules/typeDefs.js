const { gql } = require("apollo-server-express");

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
    userId: String
  }
  type OrderCreationResponse {
    id: String
  }
  input NotificationRequest {
    emailAddress: String
    productId: String
  }
  input UserFavourites {
    emailAddress: String
    favouriteProductIds: [String]
  }
  input OrderItem {
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image: String
  }
  input Order {
    emailAddress: String
    orderItems: [OrderItem]
  }
  type Query {
    merchants: [Merchant!]!
  }
  type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
    order(orderData: Order): OrderCreationResponse
    notification(notification: NotificationRequest): Boolean
    favourite(userFavourites: UserFavourites): Boolean
  }
`;

module.exports = typeDefs;
