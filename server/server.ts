import express from "express";
import { ApolloServer } from "apollo-server-express";
import MerchantResolver from "./modules/merchant/resolvers";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import OrderResolver from "./modules/order/resolvers";

export const PORT = process.env.PORT || 3000;

const init = async () => {
  // #7 Initialize an Express application
  const app = express();
  // initialize database
  const connection = await createConnection();
  await connection.runMigrations();

  const schema = await buildSchema({
    resolvers: [MerchantResolver, OrderResolver]
  });

  // initialize an Apollo server
  const server = new ApolloServer({ schema });
  // use the Express application as middleware in Apollo server
  server.applyMiddleware({ app });

  // set the port that the Express application will listen to
  app.listen({ port: PORT }, () => {
    console.log(
      `Server running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

init();
