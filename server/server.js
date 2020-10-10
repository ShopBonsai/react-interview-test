// #1 Import Express and Apollo Server
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
var config = require("./config");

var cors = require("cors");

// #3 Import GraphQL type definitions
const typeDefs = require("./modules/merchant/graphqlSchema");

// #4 Import GraphQL resolvers
const resolvers = require("./modules/merchant/resolvers");

// #5 Initialize an Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// #6 Initialize an Express application
const app = express();

//Get port and client url configs
const { PORT = 3000, CLIENT_URL } = config;

//Set Cors options
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app, cors: false });

// #8 Set the port that the Express application will listen to
app.listen({ port: 3000 }, () => {
  console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
});
