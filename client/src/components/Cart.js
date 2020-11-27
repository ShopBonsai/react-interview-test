import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import CartItems from './CartItems';
import GTMConstants from '../helpers/GTMConstants';

const GET_CART_PRODUCTS = gql`
  {
    cart {
      productId
      name
      quantity
      price
    }
  }
`;
export { GET_CART_PRODUCTS };

const withCartProducts = Component => props => {
  return (
    <Query query={GET_CART_PRODUCTS}>
      {({ loading, data: { cart: cartProducts } }) => {
        return (
          <Component cartLoading={loading} cartProducts={cartProducts} {...props} />
        );
      }}
    </Query>
  );
};

const Cart = props => {
  return (
    <div className="cart">
      <h1>
        Cart
      </h1>
      <CartItems {...props} />
      <Button
        className="gtm-click-checkout"
        color="primary"
        size="lg"
        block
        data-gtmclickid={GTMConstants.EVENT_IDS.CHECKOUT}
      >
        Checkout
      </Button>
    </div>
  );
}

Cart.propTypes = {
  cartLoading: PropTypes.bool.isRequired,
  cartProducts: PropTypes.array.isRequired,
};

Cart.defaultProps = {
  cartLoading: false,
  cartProducts: [],
};

export default withCartProducts(Cart);

