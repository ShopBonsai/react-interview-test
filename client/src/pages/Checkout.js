import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Table, Container, Row, Col, Button } from 'reactstrap';
import { emptyCart } from "../actions/cartAction";

export default function Checkout(props) {
  const dispatch= useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() =>{
    dispatch(emptyCart());
  }, []);

  const calculateCartTotal = (items) =>{
    const totalCost = Object.values(items).reduce((total, {price, qty}) =>{
      return (total + (price* qty))
    }, 0);
    return totalCost;
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="checkout">
            <h1>Thank you for your purchase...</h1>
          </div>
        </Col>
      </Row>
    </Container>
  )
};