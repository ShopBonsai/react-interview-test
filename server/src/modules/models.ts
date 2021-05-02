import { Schema, model } from 'mongoose';

const brandSchema = new Schema({
  name: String,
  merchantId: String,
});

const merchantSchema = new Schema({
  logo: String,
  publishedState: Boolean,
  merchant: String,
  commissionFee: String,
  contactEmail: String,
  phone: String,
  address: String,
  publishedDate: Date,
  publishedBy: {
    userId: String,
  },
  companyDescription: String,
  brands: [{
    type: Schema.Types.ObjectId,
    ref: 'brand',
 
  }],
}, { timestamps: true });

const productSchema = new Schema({
  belongsToBrand: String,
  belongsToMerchant: String,
  id: String,
  name: String,
  price: Number,
  description: String,
  color: String,
  size: String,
  quantity: Number,
  image: String,
}, { timestamps: true });

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String,
}, { timestamps: true });

merchantSchema.index({ merchant: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
brandSchema.index({ name: 1 }, { unique: true })

const Product = model('product', productSchema);
const Brand = model('brand', brandSchema);
const Merchant = model('merchant', merchantSchema);
const User = model('user', userSchema);

export default { Product, Merchant, Brand, User };
