import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavLink className="mx-2" to="/">
          Products
        </NavLink>
        <NavLink className="mx-2" to="/orders">
          Orders
        </NavLink>
      </Nav>
    </div>
  );
};

export default Navbar;
