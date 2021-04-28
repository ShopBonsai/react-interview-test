// #1 Import Express and Apollo Server
const express = require('express');
const cors = require('cors');

// #2 Import Database and Kafka Producer
const mainDb = require('./db/connect');
const produceEvent = require('./kafka/viewProductProducer');

const { ApolloServer } = require('apollo-server-express');

// #3 Import GraphQL type definitions
const typeDefs = require('./modules/merchant/graphqlSchema');

// #4 Import GraphQL resolvers
const resolvers = require('./modules/merchant/resolvers');

// #5 Initialize an Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// #6 Initialize an Express application
const app = express();

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// #8 Set up my REST API since I can't figure out how to query with apollo
app.use(cors());
app.use(express.json());

// GET `/products/:id`
const productFind = async (req: any, res: any) => {
  const { id } = req.params;
  const user_id = req.headers.authorization;
  console.log('user_id', user_id);
  console.log('id', id);
  produceEvent({ id, user_id });

  const product = await mainDb('products').where('id', id).first();
  res.status(200).json({ product });
};

app.get('/products/:id', productFind);

// GET `/users?username=""`
const userFind = async (req: any, res: any) => {
  const { username } = req.query;
  const user = await mainDb('users').where('username', username).first();
  res.status(200).json({ user });
};
app.get('/users', userFind);

// #9 Set the port that the Express application will listen to
app.listen({ port: 3000 }, () => {
  console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
});
