import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import { useState } from "../state";

export const NavHeader = () => {
  const [state, dispatch] = useState();

  return (
    <div className="h-16 bg-white sticky border-b border-gray-300 top-0 flex items-center justify-between px-6">
      <Link to="/">
        <img src={logo} width="32" />
      </Link>

      <NavItem to="/products" text="Merchants" />

      <div className="flex-1" />

      {state.user ? (
        <NavItem
          text="Sign Out"
          onClick={() => dispatch({ type: "CLEAR_JWT" })}
        />
      ) : (
        <>
          <NavItem to="/login" text="Sign In" />
          <NavItem to="/signup" text="Sign Up" />
        </>
      )}
    </div>
  );
};

function NavItem({ text, to, onClick }) {
  const item = (
    <div
      className="ml-5 text-gray-500 cursor-pointer hover:text-black"
      onClick={onClick}
    >
      {text}
    </div>
  );

  if (to) {
    return <Link to={to}>{item}</Link>;
  }

  return item;
}
