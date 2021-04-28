const { addTimestamps } = require('../knexHelper.ts');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('brands', function createBrandsTable(t) {
    t.increments().notNullable();

    t.string('name').notNullable().unique();

    // ❕ Columns below are "bonus" ones
    t.string('image_url');
    t.text('description', 'mediumtext');
    // END OF "BONUS" timestamps

    // TIMESTAMPS
    addTimestamps(knex, t);
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('brands');
};
