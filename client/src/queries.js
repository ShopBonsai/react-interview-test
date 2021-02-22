import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  {
    products {
      id
      name
      price
      description
      color
      size
      image
      quantity
    }
  }
`;

export const GET_ORDERS = gql`
  {
    orders {
      id
      quantity
      totalPrice
    }
  }
`;
