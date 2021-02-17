import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import * as BrowserStorage from "./BrowserStorage";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = BrowserStorage.read("local", "jwt");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const createApolloClient = () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
