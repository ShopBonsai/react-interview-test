/*
 * TODO: Add `types` to the arguments below to accept only appropriate Knex classes
 * NOTE: Still, there does not seem to be an official way to add Knex "@types"
 * Going to leave this as a .ts because it helps with suggestions/hints, etc.
 */
const addTimestamps = (knex, table) => {
  table
    .dateTime('created_at')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  table
    .dateTime('updated_at')
    .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
};

module.exports = { addTimestamps };
