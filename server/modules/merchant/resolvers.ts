import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { multiply } from "mathjs";
import Merchant from "../../db/entity/Merchant";
import Order from "../../db/entity/Order";
import Product from "../../db/entity/Product";

@Resolver()
class MerchantResolver {
  @Query(() => [Merchant])
  merchants(): Promise<Merchant[]> {
    return Merchant.find({ relations: ["brands", "products"] });
  }
  @Query(() => [Product])
  products(): Promise<Product[]> {
    return Product.find();
  }
  @Mutation(() => Product)
  async buyProduct(
    @Arg("id", () => String) id: string,
    @Arg("quantity", () => Int) quantity: number
  ): Promise<Product | undefined> {
    const product = await Product.findOne(id);
    if (!product) {
      return undefined;
    }

    if (quantity <= product.quantity) {
      // remove bought quantity
      product.quantity -= quantity;
    }
    product.save();

    // create order
    const newOrder = new Order();
    newOrder.productId = id;
    newOrder.quantity = quantity;
    newOrder.totalPrice = multiply(product.price, quantity);
    await Order.save(newOrder);

    return product;
  }
}

export default MerchantResolver;
