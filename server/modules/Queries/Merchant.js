const db = require('../../db/connect');

const GET_ALL_MERCHANTS = async () => {
  const res = await db('merchants');
  return res;
};

const GET_MERCHANT_PRODUCTS = async ({ id }) => {
  const productIdsRes = await db
    .select('product_id')
    .from('merchant_products')
    .where('merchant_id', id);

  const productIds = productIdsRes.map(r => r.product_id);

  return await db('products').whereIn('id', productIds);
};

const FIND_MERCHANT = async (_, { id }) => {
  return await db('merchants').where('id', id).first();
};

module.exports = { GET_ALL_MERCHANTS, GET_MERCHANT_PRODUCTS, FIND_MERCHANT };
