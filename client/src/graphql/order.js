import { gql } from "apollo-boost";

export const SET_ORDER = gql`
  mutation saveOrderRequest($orderData: Order) {
    order(orderData: $orderData) {
      id
    }
  }
`;
