import React, { Component } from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./createApolloClient";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import "./styles.css";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div className="main-container">
          <Products className="product-list" />
          <Cart className="cart" />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
