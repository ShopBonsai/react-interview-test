import { Merchant } from "../../entity/Merchant";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Cart, CartInput } from "../../entity/Cart";
@Resolver()
export class MerchantResolver {
  @Query(() => [Merchant])
  merchants(): Promise<Merchant[]> {
    return Merchant.find<Merchant>()
  }
}

@Resolver()
export class CartResolver {
  @Query(() => [Cart])
  cart(): Promise<Cart[]> {
    return Merchant.find<Cart>()
  }

  @Mutation(() => Cart)
  async createCart(@Arg("data") data: CartInput): Promise<Cart> {
    let cart = await Cart.findOne({ where: { sessionId: data.sessionId } });
    if (cart != undefined) //cart for this session already exists, update it
    {
      // TODO look for the current prodcut and replace/update it if exists
      cart.products = [...cart.products, { merchantId: data.merchantId, productId: data.productId, quantity: data.quantity }];
      
      return cart.save();

    }
    else {
      const cartData = Cart.create({ sessionId: data.sessionId, products: [{ merchantId: data.merchantId, productId: data.productId, quantity: data.quantity }] });
      
      return Cart.save(cartData);
    }
  }
}