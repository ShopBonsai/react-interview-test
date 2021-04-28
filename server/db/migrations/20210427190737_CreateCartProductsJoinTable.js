const { addTimestamps } = require('../knexHelper.ts');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('user_cart_products', createJoinTable);

  function createJoinTable(t) {
    t.increments().notNullable();

    // belongs_to a `user)cart`
    t.integer('user_cart_id')
      .unsigned()
      .references('id')
      .inTable('user_carts')
      .notNullable();

    // belongs_to a `product`
    t.integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .notNullable();

    t.integer('quantity').notNullable().defaultTo(1);

    addTimestamps(knex, t);
  }
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('cart_products');
};
