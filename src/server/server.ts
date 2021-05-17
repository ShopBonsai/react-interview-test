import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { MerchantResolver, CartResolver } from "./modules/merchant/resolvers";
import { buildSchema } from "type-graphql";

createConnection().then(async () => {
  const schema = await buildSchema({
    resolvers: [MerchantResolver, CartResolver],
    validate: false
  })

  const server = new ApolloServer({ schema, introspection: true, playground: true })
  await server.listen(3000)
  console.log("Server has started!")

}).catch(error => console.log(error));