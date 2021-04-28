const { addTimestamps } = require('../knexHelper.ts');

exports.up = async function startMigration(knex) {
  await knex.schema.createTable('products', function createProductsTable(t) {
    t.increments().notNullable();

    // belongs_to a `brand`
    t.integer('brand_id')
      .unsigned()
      .references('id')
      .inTable('brands')
      .onDelete('cascade');

    t.string('product_name').notNullable();
    t.specificType('price', 'double precision').notNullable(); // 👉 More accuracy
    t.text('description', 'mediumtext');
    t.string('color');
    t.string('size');
    t.integer('quantity').notNullable(); // 🤔 May want to put this in another table
    t.string('image_url');

    // TIMESTAMPS
    t.dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    t.dateTime('updated_at').defaultTo(
      knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP')
    );
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.dropTableIfExists('products');
};
