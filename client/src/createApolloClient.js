import { ApolloClient, createHttpLink } from "@apollo/client";

import { cache } from "./cache";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache,
  link: httpLink,
});
export default client;
