import { Query, Resolver } from "type-graphql";
import Order from "../../db/entity/Order";

@Resolver()
class OrderResolver {
  @Query(() => [ Order ])
  orders(): Promise<Order[]> {
    return Order.find()
  }
}

export default OrderResolver
