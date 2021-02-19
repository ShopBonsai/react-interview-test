const {
  NotificationRequestModel,
  OrderModel,
  UserFavouritesModel,
} = require("./databaseSchemas");
const { merchants } = require("../../mockMerchantData");

const resolvers = {
  Mutation: {
    favourite: async (_, favouriteData) => {
      if (process.env.MONGO_ENABLED === "true") {
        await UserFavouritesModel.create(favouriteData.userFavourites);
      }
    },
    notification: async (_, notificationData) => {
      if (process.env.MONGO_ENABLED === "true") {
        await NotificationRequestModel.create(notificationData.notification);
      }
    },
    order: async (_, orderData) => {
      if (process.env.MONGO_ENABLED === "true") {
        await OrderModel.create(orderData.orderData);
      }
    },
  },
  Query: {
    merchants: () => merchants,
  },
};

module.exports = resolvers;
