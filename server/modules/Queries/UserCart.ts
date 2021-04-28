/*
 * TypeScript bullcrap
 */
// Cannot redeclare block-scoped variable 'db2'.
const db2 = require('../../db/connect');

interface argsGetAllProductsInCart {
  user_id: string;
}

const GET_ALL_PRODUCTS_IN_CART = async (
  _: any,
  args: argsGetAllProductsInCart
) => {
  // GET the current users cart
  const userCartIdRes = await db2('user_carts')
    .where('user_id', args.user_id)
    .first();

  const userCart = await db2('user_cart_products').where(
    'user_cart_id',
    userCartIdRes.id
  );

  // @return [Products]!
  return await db2('products').whereIn(
    'id',
    userCart.map((rec: any) => rec.product_id)
  );
};

module.exports = { GET_ALL_PRODUCTS_IN_CART };
