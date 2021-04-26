import React from "react";
import Layout from "./components/Layout";
import { ProductsContextProvider } from "./context/products-context";
import { ShoppingCartContextProvider } from "./context/shoppingcart-context";
import { getPageLoad } from "./utils/getPageLoad";

const App: React.FC = () => {
  React.useEffect(() => {
    getPageLoad();
  }, []);

  return (
    <ProductsContextProvider>
      <ShoppingCartContextProvider>
        <Layout />
      </ShoppingCartContextProvider>
    </ProductsContextProvider>
  );
};

export default App;
