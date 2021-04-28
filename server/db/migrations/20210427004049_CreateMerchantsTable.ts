const { addTimestamps } = require('../knexHelper.ts');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('merchants', function createMerchantTable(t) {
    t.increments().notNullable();
    t.integer('index_val').notNullable();
    t.string('guid').notNullable();
    t.string('logo').notNullable();
    t.boolean('published_state');
    t.string('merchant_name').collate('utf8_unicode_ci');
    /*
     * Using DOUBLE for extra precision:
     * ✅ More accurate
     * ✅ It is realted to currency (possibly, globally)
     */
    t.specificType('commission_fee', 'double precision');

    /*
     * TODO: If more metadata accumulates, move to another table
     * Put this metadata here for now
     */
    t.string('contact_email');
    t.string('phone_number');
    t.string('address');
    t.dateTime('published_date');
    t.text('description', 'mediumtext');

    // TIMESTAMPS
    addTimestamps(knex, t);
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('merchants');
};
