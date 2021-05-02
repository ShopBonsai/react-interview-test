// #1 Import Express and Apollo Server
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import models from "./modules/models";

// #3 Import GraphQL type definitions
import { typeDefs } from "./modules/merchant/graphqlSchema";

// #4 Import GraphQL resolvers
import { resolvers } from "./modules/merchant/resolvers";

dotenv.config();

// #5 Initialize an Apollo server
const server = new ApolloServer({
  context: { models },
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

// #6 Initialize an Express application
const app = express();

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// #8 Set the port that the Express application will listen to

const start = async () => {
  try {
    await mongoose.connect(String(process.env.MONGO_URI), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("mongodb connected!");
    app.listen({ port: 3000 }, () => {
      console.log(
        `Server running on http://localhost:3000${server.graphqlPath}`
      );
    });
  } catch (error) {
    throw new Error(`could not connect to mongoose ${error}`);
  }
};

start();
