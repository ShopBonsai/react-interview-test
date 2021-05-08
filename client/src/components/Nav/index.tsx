import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { toggleCart } from '../../actions';
import { RootState } from '../../interfaces';

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector((state: RootState) => state.shop.cart.itemCount);

  const toggle = () => dispatch(toggleCart());

  return (
    <div className="nav">
      <Button color="info" onClick={toggle}>
        Cart ({itemCount})
      </Button>
    </div>
  );
};

export default Nav;
