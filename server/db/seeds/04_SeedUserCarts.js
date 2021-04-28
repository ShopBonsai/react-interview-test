const db = require('../connect');

exports.seed = async function createUserCartForEachUser(knex) {
  // ❗️This will delete existing user_carts
  await knex('user_carts').del();

  const userIdRes = await knex.select('id').from('users');
  const userIds = userIdRes.map(rec => {
    return { user_id: rec.id };
  });
  await knex('user_carts').insert(userIds);
};
