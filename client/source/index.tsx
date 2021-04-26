import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./createApolloClient";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
