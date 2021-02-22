import { gql } from "@apollo/client";

export const BUY_PRODUCT = gql`
  mutation BuyProduct($id: String!, $quantity: Int!) {
    buyProduct(id: $id, quantity: $quantity) {
      id
      quantity
    }
  }
`;
