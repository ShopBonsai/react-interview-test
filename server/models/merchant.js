const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
    index: Number,
    guid: String,
    logo: String,
    dateCreated: String,
    publishedState: Boolean,
    brands: [String],
    merchant: String,
    products: [Object],
    commissionFee: String,
    contactEmail: String,
    phone: String,
    address: String,
    publishedDate: String,
    publishedBy: {
        userId: String
    },
    companyDescription: String
});

module.exports = mongoose.model('Merchant', MerchantSchema, 'bonsai-merchants')
