enum Config {
  LIMIT = 200,
}

const resolvers = {
  Query: {
    merchants: (_: any, __: any, { models }: any) => {
      return models.Merchant.find({}).populate("brands").exec();
    },
    products: (
      _: any,
      { merchant: belongsToMerchant, limit, skip, sortBy }: any,
      { models }: any
    ) => {
      if (limit && limit > Config.LIMIT) {
        throw new Error(
          `exceeded limit please fetch number of records below ${Config.LIMIT}`
        );
      }

      const config: any = {
        merchant: {
          sort: { belongsToMerchant: 1 },
          limit: limit ? limit : Config.LIMIT,
          skip: skip && skip,
        },
        brand: {
          sort: { belongsToMerchant: 1 },
          limit: limit ? limit : Config.LIMIT,
          skip: skip && skip,
        },
        null: {
          limit: limit ? limit : Config.LIMIT,
          skip: skip && skip,
        },
      };

      if (!belongsToMerchant) {
        return models.Product.find({}, null, config[sortBy]).exec();
      }

      return models.Product.find(
        { belongsToMerchant },
        null,
        config[sortBy]
      ).exec();
    },
    brands: (_: any, args: any, { models }: any) => {
      return models.Product.find({}).exec();
    },
  },
  Mutation: {
    createMerchant: async (_: any, { input }: any, { models }: any) => {
      return models.Merchant.create(input);
    },
  },

  Product: {
    brand(product: any, _: any, { models }: any) {
      return models.Brand.findOne({ _id: product.belongsToBrand });
    },
    merchant(product: any, _: any, { models }: any) {
      return models.Merchant.findOne({ _id: product.belongsToMerchant });
    },
    id(product: any) {
      return product._id;
    },
  },

  Merchant: {
    products(merchant: any, { limit, skip }: any, { models }: any) {
      const brands = merchant.brands.map((brand: any) => brand.id);
      return models.Product.find({ belongsToBrand: { $in: brands } }, null, {
        limit: limit ? limit : Config.LIMIT,
        skip: skip && skip,
      });
    },

    dateCreated(merchant: any) {
      return new Date(merchant.createdAt).toISOString();
    },
    guid(merchant: any) {
      return merchant._id;
    },
  },

  Brand: {
    merchantId(brand: any, _: any, __: any) {
      return brand._id;
    },
  },
};

export { resolvers };
