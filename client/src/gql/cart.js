import { gql } from '@apollo/client'

export const GET_CART = gql`
  query GetCart {
    cart {
      id
      name
      color
      size
      price
      description
      quantity
    }
  }
`

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: String, $quantity: Int) {
    addToCart(productId: $productId, quantity: $quantity) {
      products {
        id
        name
      }
    }
  }
`

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: String) {
    removeFromCart(productId: $productId) {
      products {
        id
        name
      }
    }
  }
`