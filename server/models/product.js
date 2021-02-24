const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    belongsToBrand: Number,
    name: String,
    price: Number,
    description: String,
    color: String,
    size: String,
    quantity: Number,
    image: String,
});
module.exports = mongoose.model('Product', ProductSchema)
