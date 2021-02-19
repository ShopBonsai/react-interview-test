import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './styles.css';

class NavBar extends Component {
    render() {
      return (
        <Nav>
            <NavItem>
                <NavLink href={'/'}>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href={'/users'}>User List</NavLink>
            </NavItem>
        </Nav>
      );
    }
  }
  export default NavBar