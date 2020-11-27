import React from 'react';
import { ListGroupItem } from 'reactstrap';

const CartItem = props => {
  const { name, quantity } = props;
    
  return (
    <ListGroupItem>
      {name} {quantity > 1 && (`(${quantity})`)}
    </ListGroupItem>
  );
}
export default CartItem;
