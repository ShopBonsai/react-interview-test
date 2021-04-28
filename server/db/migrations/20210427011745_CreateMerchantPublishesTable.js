const { addTimestamps } = require('../knexHelper.ts');

/**
 * Track metadata on merchants that publish "events"
 * In the future, could track devices, URI, etc
 * ie. Anything that we believe to be of use, relating to a "publish event"
 */
exports.up = async function startMigration(knex) {
  await knex.schema.createTable('merchant_publishes', createEventTable);

  function createEventTable(t) {
    t.increments().notNullable();

    // belongs_to a `merchant`
    t.integer('merchant_id')
      .unsigned()
      .references('id')
      .inTable('merchants')
      .notNullable();

    // belongs_to a `user`
    t.string('user_id').notNullable();

    addTimestamps(knex, t);
  }
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('merchant_publishes');
};
