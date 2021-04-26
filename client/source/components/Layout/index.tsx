import * as React from "react";
import ProductsList from "../Products";
import Toolbar from "./Toolbar";

const Layout: React.FC = () => {
  return (
    <>
      <Toolbar />
      <ProductsList />
    </>
  );
};

export default Layout;
