const { merchants } = require("../../../mockMerchantData")

const merchantsByGuid = merchants.reduce((acc, merchant) => ({ [merchant.guid]: merchant, ...acc }), {});

const productsById = {};
const merchantsByProductId = {}
merchants.forEach((merchant) => {
  merchant.products.forEach((product) => {
    productsById[product.id] = product;
    merchantsByProductId[product.id] = merchant;
  });
});

const resolvers = {
  Query: {
    merchants: () => merchants,
    merchant: (_, { guid }) => {
      return merchantsByGuid[guid]
    },
  },
  Mutation: {
    /* TODO: Restrict merchant updates by current user */
    editMerchantWithGuid: (_, {
      guid,
      merchant: merchantName,
      contactEmail,
      phone,
      address,
      companyDescription,
    }) => {
      const merchant = merchantsByGuid[guid];
      merchant.merchant = merchantName;
      merchant.contactEmail = contactEmail;
      merchant.phone = phone;
      merchant.address = address;
      merchant.companyDescription = companyDescription;
      return merchant;
    },
    deleteProductWithId: (_, { id }) => {
      const product = productsById[id];
      if (product) {
        const merchant = merchantsByProductId[product.id];
        merchant.products = merchant.products.filter((merchantProduct) => merchantProduct.id !== product.id);
        delete productsById[id];
      }
      return id;
    },
  },
};

module.exports = resolvers;