"use strict";
exports.__esModule = true;
// #1 Import Express and Apollo Server
var express = require("express");
var apollo_server_express_1 = require("apollo-server-express");
// #3 Import GraphQL type definitions
var graphqlSchema_1 = require("./modules/merchant/graphqlSchema");
// #4 Import GraphQL resolvers
var resolvers_1 = require("./modules/merchant/resolvers");
// #5 Initialize an Apollo server
var server = new apollo_server_express_1.ApolloServer({ typeDefs: graphqlSchema_1.typeDefs, resolvers: resolvers_1.resolvers });
// #6 Initialize an Express application
var app = express();
// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app: app });
// #8 Set the port that the Express application will listen to
app.listen({ port: 3000 }, function () {
    console.log("Server running on http://localhost:3000" + server.graphqlPath);
});
