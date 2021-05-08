// #1 Import Express and Apollo Server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// #3 Import GraphQL type definitions
const typeDefs = require('./modules/merchant/graphqlSchema');

// #4 Import GraphQL resolvers
const resolvers = require('./modules/merchant/resolvers');

// #5 Initialize an Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// #6 Initialize an Express application
const app = express();

// parse incoming json request bodies
app.use(express.json());

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// apiController
const apiController = require('./controllers/apiController.js');

// checkout endpoint
app.post('/api/checkout', apiController.createOrder, (req, res) => {
  res.status(200).json({ message: 'Successfully Checked Out!' });
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

// #8 Set the port that the Express application will listen to
app.listen({ port: 3000 }, () => {
  console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
});
