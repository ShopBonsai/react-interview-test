import React from 'react';

export default function QuantityIndicators(props) {
  return (
    <div className="qty-indicators">
      <button 
        disabled={
          (props.cartItem && props.cartItem.qty && props.cartItem.qty >= props.product.quantity)
          }
        onClick={() => props.increaseQty(props.product)}
        className="qty-btn"
        type="button"
        size="sm"
      >+</button>
        <span className="qty-text">{props.cartItem && props.cartItem.qty || 0}</span>
      <button
        disabled={!props.cartItem || props.cartItem.qty <= 0}
        onClick={() => props.decreaseQty(props.product)}
        className="qty-btn"
        type="button" 
        size="sm"
      >-</button>
    </div>
  )
};
