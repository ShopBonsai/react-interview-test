// 😠 It's called db3 because `Cannot redeclare block-scoped variable 'db'.`
// I do not have time to fix that rn
const db3 = require('../../db/connect');

/*
 * No longer using this to folder to query (from client)
 * produceViewProductEvent is now going be used in the /server.ts
 */
// const { produceViewProductEvent } = require('./viewProductProducer.js');
interface argsFindProduct {
  id: number;
  user_id?: string;
}

const FIND_PRODUCT = async (_: any, { id, user_id }: argsFindProduct) => {
  console.log('user_id', user_id);
  // Do this asynchronously
  // produceViewProductEvent({ id, user_id });
  return await db3('products').where('id', id).first();
};

module.exports = { FIND_PRODUCT };
