import React, {useState} from 'react';
import { useSelector } from "react-redux";
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import  { Link as RRNavLink } from "react-router-dom";

export default function NavigationBar(props) {
  const cartItems = useSelector(state => state.cart.items);

  return (
    <Navbar color="faded" light expand="md" fixed="true">
      <Collapse isOpen={false} navbar>
          <Nav className="mr-auto" navbar fill={true}>
            <NavItem>
              <NavLink to="/" exact tag={RRNavLink}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cart" exact tag={RRNavLink}>Cart ({Object.keys(cartItems).length || 0})</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
    </Navbar>
  )
}
