// #1 Import Express and Apollo Server
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

// #2 Load up the environment vars
dotenv.config();

// #3 Connect to DB if it is enabled
if (process.env.MONGO_ENABLED === "true") {
  const mongoServer = `${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`;
  mongoose.connect(`mongodb://${mongoServer}`, { useNewUrlParser: true });
  const db = mongoose.connection;

  db.on("error", () => {
    // eslint-disable-next-line
    console.error(`Failed to connect to mongodb: ${mongoServer}`);
  });
  db.on("open", () => {
    // eslint-disable-next-line
    console.error(`Connected to mongodb: ${mongoServer}`);
  });
}

// #3 Import GraphQL type definitions
const typeDefs = require("./modules/typeDefs");

// #4 Import GraphQL resolvers
const resolvers = require("./modules/resolvers");

// #5 Initialize an Apollo server
const server = new ApolloServer({ resolvers, typeDefs });

// #6 Initialize an Express application
const app = express();

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// #8 Set the port that the Express application will listen to
app.listen({ port: 3000 }, () => {
  //eslint-disable-next-line no-console
  console.log(
    `Server running on http://${process.env.APOLLO_CLIENT_HOST}${server.graphqlPath}`
  );
});
