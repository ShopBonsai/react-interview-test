exports.up = async function startMigration(knex) {
  await knex.schema.alterTable('products', function updateProductsTable(t) {
    t.string('original_id').unique().notNullable();
  });
};

exports.down = async function startMigration(knex) {
  await knex.schema.table('products', function dropOriginalIdColumn(t) {
    t.dropColumn('original_id');
  });
};
