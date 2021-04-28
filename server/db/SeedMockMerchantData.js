// exports.seed = async function seedMockMerchantData(knex) {
const { merchants } = require('../../mockMerchantData');
const knex = require('./connect');

/*
 *  FIXME: Running this function fails to exit.
 * It appears that knex is running "forever"
 * Similar to this: https://stackoverflow.com/questions/50783466/tests-running-forever-with-knex-and-mocha
 */

async function seedMockMerchantData() {
  // ❗️ Delete existing data
  await knex('merchant_publishes').del();
  await knex('merchant_products').del();
  await knex('merchants').del();
  await knex('products').del();

  merchants.map(async m => {
    // Create a `merchant` record

    /*
     * 🚨 Must to .replace('T', ' ') on all dates
     * This is because format has a "T" which can't be parsed
     */
    const _merchObj = {
      index_val: m.index,
      guid: m.guid,
      logo: m.logo,
      created_at: new Date(m.dateCreated.replace('T', ' ')),
      published_state: m.publishedState,
      merchant_name: m.merchant,
      commission_fee: parseInt(m.commissionFee) / 100,
      contact_email: m.contactEmail,
      address: m.address,
      published_date: new Date(m.publishedDate.replace('T', ' ')),
      description: m.companyDescription,
    };

    const merchId = await knex('merchants').insert(_merchObj);

    // Query the `user` by `id`
    const user = await knex
      .select('*')
      .from('users')
      .where('id', m.publishedBy.userId)
      .first();

    // Create the `merchant_publishes` event
    await knex('merchant_publishes').insert({
      user_id: user.id,
      merchant_id: merchId,
    });

    /* ================================= */
    const merchantProduct = m.products;
    const merchantBrands = m.brands;
    /* ================================= */

    // Create individual `products` of the merchant
    try {
      merchantProduct.map(async p => {
        let prod = {
          original_id: p.id,
          product_name: p.name,
          price: p.price,
          description: p.description,
          size: p.size,
          quantity: p.quantity,
          image_url: p.image,
        };

        // Query the `brand` by ID
        const prodBrand = await knex
          .select('*')
          .from('brands')
          .where('name', merchantBrands[p.belongsToBrand])
          .first();

        // Create the `product` (with appropriate brand_id)
        const prodRecordId = await knex('products').insert({
          ...prod,
          brand_id: prodBrand.id,
        });

        // Create `merchant_products` record in our join table
        await knex('merchant_products').insert({
          merchant_id: merchId,
          product_id: prodRecordId,
        });
      });
    } catch (err) {
      console.log(`There was an Error: ${err}`);
    }
  });
}

seedMockMerchantData();
console.log('✅ users seeded');
console.log('✅ brands seeded');
console.log('✅ carts seeded');
console.log('✅ products & merchants seeded');
