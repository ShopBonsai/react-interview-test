import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import apolloClient from "./createApolloClient";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Orders from "./components/Orders";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/" exact>
            <Products />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
