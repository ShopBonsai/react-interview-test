import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
import { GET_CART, REMOVE_FROM_CART } from '../gql'

const Cart = props => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const toggle = () => setPopoverOpen(!popoverOpen)

  const { loading, data } = useQuery(GET_CART, { fetchPolicy: 'network-only' })

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    update(cache, { data: { removeFromCart } }) {
      cache.writeQuery({
        query: GET_CART,
        data: { cart: removeFromCart }
      })
    }
  })

  const cartTotal = data && data.cart.reduce((acc, item) => {
    return item.quantity + acc
  }, 0)

  return (
    <>
      <Button id="cart-btn" type="button" disabled={loading}>
        {loading ? 'Loading Cart...' : `Cart (${cartTotal})`}
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target="cart-btn" toggle={toggle}>
        <PopoverBody>
          <ul className="cart-list">
            {!loading && data && data.cart.map((item, i) => (
              <li className="cart-item" key={i}>
                <div>
                  <span className="cart-item-name">{item.name}</span>
                </div>
                <div>
                  <span className="cart-item-quantity">Quantity: {item.quantity}</span>
                  <button onClick={() => removeFromCart({ variables: { productId: item.id }})}>X</button>
                </div>
              </li>
            ))}
          </ul>
        </PopoverBody>
      </Popover>
    </>
  )
}

export default Cart