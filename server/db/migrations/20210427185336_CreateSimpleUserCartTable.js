const { addTimestamps } = require('../knexHelper.ts');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('user_carts', function createUserCartTable(t) {
    t.increments().notNullable();

    // belongs_to a `user`
    t.string('user_id').notNullable().unique();

    // ❕ Maybe I will use this... maybe not. Can always drop later
    t.integer('num_items').defaultTo(0);

    // TIMESTAMPS
    addTimestamps(knex, t);
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('user_carts');
};
