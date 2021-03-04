import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { CardTitle, CardSubtitle, CardText, Button, CardBody, Media } from 'reactstrap'

import {
  GET_CART,
  ADD_TO_CART
} from '../gql'
import { Quantity } from '.'

const Product = props => {
  const { id, image, name, price, color, size, description } = props.product

  const [quantity, setQuantity] = useState(0)

  const decreaseQuantity = () => {
    if (quantity <= 0) {
      setQuantity(0)
    } else {
      setQuantity(quantity-1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity+1)
  }

  const [addToCart] = useMutation(ADD_TO_CART, {
    update(cache, { data: { addToCart } }) {
      cache.writeQuery({
        query: GET_CART,
        data: { cart: addToCart }
      })
    }
  })
  const addProductToCart = () => {
    addToCart({ variables: { productId: id, quantity }})
    setQuantity(0)
  }

  return (
    <Media key={id} className="product-card">
      <Media left href="#">
        <Media object src={image} alt="Product image cap" />
      </Media>
      <CardBody className="product-card-info">
        <div>
          <CardTitle style={{fontWeight: 600}}>{name}</CardTitle>
          <CardTitle>Price: {price}</CardTitle>
          <CardSubtitle>Color: {color}</CardSubtitle>
          <CardSubtitle>Size: {size}</CardSubtitle>
          <CardText>Details: {description}</CardText>
        </div>

        <div className="add-to-cart-wrapper">
          <Button color="primary" size="lg" block onClick={addProductToCart} disabled={quantity <= 0}>Add to Cart</Button>
          <Quantity
            num={quantity}
            decrease={decreaseQuantity}
            increase={increaseQuantity}
          />
        </div>
      </CardBody>
    </Media>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProductToCart: PropTypes.func
}

export default Product