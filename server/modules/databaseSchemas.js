const mongoose = require("mongoose");

const { Schema } = mongoose;

// Orders
const OrderItemSchema = new Schema({
  color: String,
  description: String,
  id: String,
  image: String,
  name: String,
  price: Number,
  quantity: Number,
  size: String,
});

const OrderSchema = new Schema(
  {
    emailAddress: String,
    orderItems: [OrderItemSchema],
  },
  { collection: "orders" }
);

const OrderModel = mongoose.model("OrderModel", OrderSchema);

// Favourites
const UserFavouritesSchema = new Schema(
  {
    emailAddress: String,
    favouriteProductIds: [String],
  },
  { collection: "favourites" }
);
const UserFavouritesModel = mongoose.model(
  "UserFavouritesModel",
  UserFavouritesSchema
);

// Notifications
const NotificationRequestSchema = new Schema(
  {
    emailAddress: String,
    productId: String,
  },
  { collection: "notification_requests" }
);

const NotificationRequestModel = mongoose.model(
  "NotificationRequestModel",
  NotificationRequestSchema
);

module.exports = {
  NotificationRequestModel,
  NotificationRequestSchema,
  OrderModel,
  OrderSchema,
  UserFavouritesModel,
  UserFavouritesSchema,
};
