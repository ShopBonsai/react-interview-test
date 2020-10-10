import React, { useContext, Fragment } from 'react';
import Context from '../context';
import './cartContainer.css';

const Cart = () => {
  const { state: { productsInCart }, dispatch } = useContext(Context);
  if (productsInCart.length < 1) return <span></span>
  return (
    <div className="cart-container">
      <p><strong>Your 🛒 with your beautiful products 😉</strong></p>
      <hr />
      {productsInCart.map(({ id, name, image }) => (
        <Fragment key={id}>
          <div className="cart-product-container" key={id}>
            <img src={image} />
            <div className="card-product-description">
              <p>{name}</p>
              <button id={id} onClick={({ target: { id }}) => dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: { id } })} className="remove">Remove item</button>
            </div>
          </div>
          <hr />
        </Fragment>
      ))}
      <button onClick={() => alert('boom, finished.')}>Finish Purchase</button>
    </div>
  )
}

export default Cart;