const { addTimestamps } = require('../knexHelper.ts');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('users', function createBasicUsersTable(t) {
    t.string('id').primary(); //1667143e-bf62-43be-8fce-12d739d6604f
    t.string('username').notNullable().unique();

    // ❌ NOTE: NO AUTH in here, whatsoever

    // TIMESTAMPS
    addTimestamps(knex, t);
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('users');
};
