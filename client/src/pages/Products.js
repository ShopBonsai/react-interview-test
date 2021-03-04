import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'

import { GET_PRODUCTS } from '../gql'
import { Product, Sidebar, Cart } from '../components'

const ProductsList = props => {
  const [name, setName] = useState('')
  const [size, setSize] = useState('')

  const { loading: productsLoading, data: productsData } = useQuery(GET_PRODUCTS, {
    variables: { name, size }
  })

  const productsList = () => {
    if (!productsLoading && productsData.products) {
      if (productsData.products.length > 0) {
        return productsData.products.map(product => {
          return (
            <Product
              key={product.id}
              product={product}
            />
          )
        })
      } else {
        return (
          <div>
            <h3>No products found.</h3>
          </div>
        )
      }
    } else {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    }
  }

  return (
    <div className="wrapper">
      <div className="sidebar-wrapper">
        <Sidebar setName={setName} setSize={setSize} />
      </div>

      <div className="products">
        {productsList()}
      </div>
    </div>
  )
}

ProductsList.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOf(['S', 'M', 'L'])
}

export default ProductsList