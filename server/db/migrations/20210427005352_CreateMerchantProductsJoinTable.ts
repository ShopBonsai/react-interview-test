const { addTimestamps } = require('../knexHelper.ts');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('merchant_products', createJoinTable);

  function createJoinTable(t) {
    t.increments().notNullable();

    // belongs_to a `merchant`
    t.integer('merchant_id')
      .unsigned()
      .references('id')
      .inTable('merchants')
      .notNullable();

    // belongs_to a `product`
    t.integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .notNullable();

    addTimestamps(knex, t);
  }
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('merchant_products');
};
