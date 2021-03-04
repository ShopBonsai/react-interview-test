import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts($name: String, $size: String) {
    products(name: $name, size: $size) {
      id
      name
      price
      description
      color
      size
      image
    }
  }
`