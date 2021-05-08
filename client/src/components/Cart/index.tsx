import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardText } from 'reactstrap';
import { RootState } from '../../interfaces';
import { removeFromCart, checkoutCart, toggleCart } from '../../actions';
import { toFixedNumber } from '../../utils/utils';
import CartItem from '../CartItem';

const Cart: React.FC = () => {
  // would probably handle different notifications in it's own reducer with more time
  const [notification, setNotification] = useState('');
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.shop.cart.current);
  const isCartOpen = useSelector((state: RootState) => state.shop.cart.isOpen);
  const itemCount = useSelector((state: RootState) => state.shop.cart.itemCount);
  const subTotal = useSelector((state: RootState) => state.shop.cart.subTotal);

  useEffect(() => {
    if (!isCartOpen && notification) {
      setTimeout(() => {
        setNotification('');
      }, 1000);
    }
  }, [isCartOpen]);

  const removeItemFromCart = (id: string): void => {
    dispatch(removeFromCart(id));
  };

  const finalizeCheckout = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'guest',
        subTotal,
        itemCount,
        cart,
      }),
    });

    const { message } = await response.json();
    if (message) {
      dispatch(checkoutCart());
      setNotification(message);
    }
  };

  return (
    <div className={`cart ${isCartOpen && 'show'}`}>
      {notification ? (
        <Card body outline color="success" className="cart-item">
          <CardText className="text-success">{notification}</CardText>
          <Button color="success" onClick={() => dispatch(toggleCart())}>
            Back To Products
          </Button>
        </Card>
      ) : (
        <Fragment>
          <h3 className="cart-heading">Cart subtotal: ${subTotal}</h3>
          {cart.map((item) => {
            const { id, image, name, price, selectedQuantity } = item;
            return (
              <CartItem
                key={id}
                id={id}
                image={image}
                name={name}
                price={toFixedNumber(price * selectedQuantity)}
                selectedQuantity={selectedQuantity}
                removeItemFromCart={removeItemFromCart}
              />
            );
          })}
          <Button
            className="checkout"
            color="success"
            size="lg"
            block
            disabled={!cart.length}
            onClick={finalizeCheckout}
          >
            Checkout
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
