import { ApolloProvider } from "react-apollo";
import { client } from "./createApolloClient";
import { Products } from "./components";
import React from "react";

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Products />
    </ApolloProvider>
  );
};
