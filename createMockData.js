const { default: models } = require("./server/dist/modules/models");
const faker = require("faker");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Brand, Product, Merchant, User } = models;

dotenv.config();

let connected = false;
let current = 0;
const limit = 100;

const connectDb = async () => {
  await mongoose.connect(String(process.env.MONGO_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  connected = true;
  return connected;
};

const disconnectDb = async () => {
  await mongoose.disconnect();
  connected = false;
  return connected;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const getAdminUsers = async () => {
  return await User.find({ role: "ADMIN" }).exec();
};

const getMerchants = async () => {
  return Merchant.find({}).exec();
};

const getBrands = async () => {
  return Brand.find({}).exec();
};

const createUsers = async () => {
  if (!connected) {
    await connectDb();
  }

  if (current === limit) {
    return await disconnectDb();
  }

  const user = await User.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    role: "ADMIN",
  });
  current++;

  console.log(user);

  createUsers();
};

const createMerchants = async () => {
  if (!connected) {
    await connectDb();
  }

  if (current === limit) {
    return await disconnectDb();
  }

  let allAdmins = await getAdminUsers();

  allAdmins = allAdmins.map((admin) => {
    return { id: admin._id };
  });

  const { id } = allAdmins[getRandomInt(allAdmins.length)];

  const merchant = await Merchant.create({
    logo:
      "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier",
    publishedState: false,
    merchant: faker.company.companyName(),
    commissionFee: `${getRandomInt(20)}%`,
    contactEmail: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    publishedBy: {
      userId: id,
    },
    companyDescription: faker.company.bs(),
  });

  console.log(merchant);

  current++;

  createMerchants();
};

const createBrands = async () => {
  if (!connected) {
    await connectDb();
  }

  let merchants = await getMerchants();

  merchants = merchants.map(({ _id }) => {
    return { id: _id };
  });

  for (const { id } of merchants) {
    const brand = await Brand.create({
      name: faker.company.companyName(),
      merchantId: id,
    });

    const merchant = await Merchant.findById(id);
    merchant.brands.push(brand._id);
    await merchant.save();

    console.log(merchant);
  }
  return await disconnectDb();
};

createProducts = async () => {
  if (!connected) {
    await connectDb();
  }

  if (current === limit) {
    return await disconnectDb();
  }

  const brands = await getBrands();

  const sizes = ["XS", "S", "M", "L", "XL"];

  for (const { _id: belongsToBrand, merchantId: belongsToMerchant } of brands) {
    const product = await Product.create({
      belongsToBrand,
      belongsToMerchant,
      name: faker.commerce.productName(),
      price: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
      description: faker.commerce.productDescription(),
      color: faker.commerce.color(),
      size: sizes[getRandomInt(4)],
      quantity: getRandomInt(10),
      image: faker.image.fashion(),
    });
    console.log(product);
  }
  current++;
  createProducts();
};

//createProducts();
//createBrands();
//createMerchants();
//createUsers();
