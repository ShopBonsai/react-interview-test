import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';

export const SiteHeader = ({ navLinks }) => (
  <Navbar color='light' light expand='md' sticky="top">
    <NavbarBrand>Marketplace</NavbarBrand>
    <Nav className="" navbar>
      {navLinks.map(({ href, text }) => (
        <NavItem key={href}>
          <Link className='nav-link' to={href}>
            {text}
          </Link>
        </NavItem>
      ))}
    </Nav>
  </Navbar>
)