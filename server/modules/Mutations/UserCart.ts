const db = require('../../db/connect');
interface argsAddToCart {
  user_id: string;
  product_id: number;
  quantity: number;
}

interface argsInsertUserCartProducts {
  user_cart_id: number;
  product_id: number;
  quantity: number;
}

const ADD_TO_CART = async (_: any, args: argsAddToCart) => {
  // GET the current users cart
  const userCartIdRes = await db('user_carts')
    .where('user_id', args.user_id)
    .first();

  const { user_id, product_id, quantity } = args;

  if (db('products').where('product_id', product_id).first().quantity === 0) {
    throw new Error('There item is currently being restocked.');
  }
  const insertParams: argsInsertUserCartProducts = {
    user_cart_id: userCartIdRes.id,
    product_id,
    quantity,
  };

  const userCartProds = db('user_cart_products').where(
    'user_cart_id',
    userCartIdRes.id
  );

  userCartProds.then(async (userCart: any) => {
    if (userCart.length === 0) {
      await db('user_cart_products').insert(insertParams);
    } else {
      const dupItem = await userCartProds
        .where('product_id', product_id)
        .first();
      if (dupItem) {
        await db('user_cart_products')
          .where('id', dupItem.id)
          .update('quantity', dupItem.quantity + quantity);
      } else {
        await db('user_cart_products').insert(insertParams);
      }
    }
  });

  // Exactly the same, but TypeScript complains if I call GET_ALL_PRODUCTS_IN_CART
  const userCart = await db('user_cart_products').where(
    'user_cart_id',
    userCartIdRes.id
  );

  // @return [Products]!
  return await db('products').whereIn(
    'id',
    userCart.map((rec: any) => rec.product_id)
  );
};

module.exports = { ADD_TO_CART };
