import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Table, Container, Row, Col, Button } from 'reactstrap';
import QuantityIndicators from '../components/QuantityIndicators';
import { increasetItemQty, decreaseItemQty } from "../actions/cartAction";
import {useHistory} from "react-router-dom";

export default function Cart(props) {
  const dispatch= useDispatch();
  const history = useHistory();
  const [productTotal, setProductTotal] = useState(0);
  const cartItems = useSelector(state => state.cart.items);

  const handleQtyIncrease = (item) =>{
    dispatch(increasetItemQty(item));
  };

  const handleQtyDecrease = (item) =>{
    dispatch(decreaseItemQty(item));
  };

  const calculateProductTotal = (qty, price) =>{
    const total = price * qty;
    return total.toFixed(2);
  };

  const completeCheckout = () =>{
    return history.push("/checkout");
  };

  const calculateCartTotal = (items) =>{
    const totalCost = Object.values(items).reduce((total, {price, qty}) =>{
      return (total + (price* qty))
    }, 0);
    return totalCost;
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{size: 6, offset: 3}}>
          <Table hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                cartItems && Object.values(cartItems).map((item, idx) =>{
                  return (
                    <tr key={item.id}>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.name}</td>
                      <td>
                        <QuantityIndicators
                          product={item}
                          increaseQty={handleQtyIncrease}
                          cartItem={item}
                          decreaseQty={handleQtyDecrease}
                        />
                      </td>
                      <td>${calculateProductTotal(item.price, item.qty)}</td>
                    </tr>
                  )
                })
              }
              <tr>
                <th colSpan="3">Cart Total: </th>
                <td colSpan="1"><b>${calculateCartTotal(cartItems).toFixed(2)}</b></td>
              </tr>
            </tbody>
          </Table>
          <div className="checkout">
            <Button 
              color="secondary" 
              block
              onClick={completeCheckout}
              disabled={cartItems && Object.values(cartItems).length < 1}
            >Checkout</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
};