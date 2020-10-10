import React from "react";
import { cartItemsVar } from "../../cache";
import { useReactiveVar } from "@apollo/client";
import { Media, Button } from "reactstrap";
import "./styles.css";

const CartItem = (props) => {
  const { id, image, name, count } = props.item;
  const handleRemove = () => {
    const cartItems = { ...cartItemsVar() };
    delete cartItems[id];
    cartItemsVar(cartItems);
  };

  const CartItem = (
    <div className="cart-item">
      <div>
        <Media
          object
          src={image}
          alt="Product image cap"
          width="90"
          height="100"
        />
      </div>
      <div className="cart-item-info ">
        <div className="cart-item-name">{name}</div>
        <div className="cart-count-info">
          <span>Count: </span>
          <span>{count}</span>
        </div>
        <Button color="danger" size="sm" onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  );

  return CartItem;
};
const Cart = () => {
  const cartItems = useReactiveVar(cartItemsVar);
  const cartItemsArray = Object.values(cartItems);
  return (
    <div className="cart">
      <div className="cart-title">My Cart</div>
      {cartItemsArray.length === 0 ? (
        <p className="cart-no-items">No items in your cart</p>
      ) : (
        <div>
          {cartItemsArray.map((product) => (
            <CartItem key={product.id} item={product} />
          ))}
          <div className="checkout-button-wrapper">
            {/* This button is a placeholder */}
            <Button color="success">Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
