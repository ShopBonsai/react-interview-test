import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: "http://localhost:3000/graphql",
});

export default client;
