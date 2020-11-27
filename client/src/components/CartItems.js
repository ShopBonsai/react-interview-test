import TagManager from 'react-gtm-module';
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';

import GTMConstants from '../helpers/GTMConstants'
import CartItem from './CartItem';

const isCartEmpty = cartContentProps => {
  const { cartProducts, cartLoading } = cartContentProps;

  return !cartLoading && cartProducts.length === 0;
};

const getCartQuantity = cartProducts => {
  const INITIAL_QUANTITY = 0;
  return cartProducts.reduce(sumProductQuantities, INITIAL_QUANTITY);
}

const sumProductQuantities = (total, product) => {
  return total += product.quantity;
}

const CartItems = props => {
  const { cartProducts } = props;
  TagManager.dataLayer({
    dataLayer: {
      [GTMConstants.DATA_LAYER_CART_ITEM_QUANTITY]: getCartQuantity(cartProducts),
    },
  });
  
  if (isCartEmpty(props)) {
    return <p>
      Cart is empty
    </p>;
  }

  return (
    <ListGroup>
      {
        cartProducts.map(({ productId, name, quantity, price }) => {
          return (
            <CartItem 
              key={productId}
              name={name}
              quantity={quantity}
              price={price}
            />
          );
        })
      }
    </ListGroup>
  );
}

CartItems.propTypes = {
  cartLoading: PropTypes.bool.isRequired,
  cartProducts: PropTypes.array.isRequired,
};

export default CartItems;
