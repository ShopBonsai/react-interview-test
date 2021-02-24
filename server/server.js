// #0 Import DB connection function
const mongoDBConn = require('./db/connection');
// #1 Import Express and Apollo Server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// #3 Import GraphQL type definitions
const typeDefs = require('./modules/merchant/graphqlSchema');

// #4 Import GraphQL resolvers
const resolvers = require('./modules/merchant/resolvers');

// #5 Initialize an Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async() => {
    await mongoDBConn
  }
});

// #6 Initialize an Express application
const app = express();

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });



// #8 Set the port that the Express application will listen to
if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: 3000 }, async () => {
    console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
  });
}

module.exports = app
