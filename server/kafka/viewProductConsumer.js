const { Kafka } = require('kafkajs');
const db = require('../db/connect.js');

const config = {
  KAFKA_HOST: 'localhost:9092',
  KAFKA_TOPIC_NAME: 'view-product-topic',
  CLIENT_ID: 'bonsai_kafka',
};

const kafka = new Kafka({
  clientId: config.CLIENT_ID,
  brokers: [config.KAFKA_HOST],
});

const consumer = kafka.consumer({ groupId: config.CLIENT_ID });

const consumeViewProductEvents = async () => {
  // first, we wait for the client to connect and subscribe to the given topic
  await consumer.connect();
  await consumer.subscribe({ topic: config.KAFKA_TOPIC_NAME });
  await consumer.run({
    eachMessage: ({ message }) => {
      handleProductViewEvent(JSON.parse(message.value));
    },
  });
};

class ProductViewCache {
  constructor() {
    this.cacheObj = {};
  }

  hasUser(userId) {
    return userId in this.cacheObj;
  }

  has(userId, productId) {
    if (this.hasUser(userId) === false) return false;
    return productId in this.cacheObj[userId];
  }

  incrementViewFor(userId, productId) {
    if (!this.hasUser(userId)) this.cacheObj[userId] = {};
    if (!this.has(userId, productId)) {
      this.cacheObj[userId][productId] = { views: 0 };
    }

    ++this.cacheObj[userId][productId].views;
  }

  resetViewsFor(userId, productId) {
    if (this.has(userId, productId)) {
      this.cacheObj[userId][productId] = { views: 0 };
    }
  }

  getNumViewsFor(userId, productId) {
    if (this.has(userId, productId) === false) return null;
    return this.cacheObj[userId][productId].views;
  }
}

const cachedEvents = new ProductViewCache();

function handleProductViewEvent(eventBlob) {
  console.log('Incoming Event: ', eventBlob);

  const productId = eventBlob.id;
  const userId = eventBlob.user_id;
  if (userId === 'null') {
    console.log('Skip. Not processing events that contain `null` user_id.');
    return;
  }
  // State Machine
  cachedEvents.incrementViewFor(userId, productId);

  if (cachedEvents.getNumViewsFor(userId, productId) >= 5) {
    const { userEmail, emailContent } = generateEmailContent(userId, productId);
    generateEmailContent(userId, productId)
      //
      .then(res => {
        sendEmail(res.userEmail, res.emailContent);
        cachedEvents.resetViewsFor(userId, productId);
      });
  }
}

const generateEmailContent = async (userId, productId) => {
  const userEmail = 'dsomel21@gmail.com';

  const product = await db('products').where('id', productId).first();

  const emailContent = {
    subject: `${product.product_name} is having a special offer! Just for you!`,
    text: `We saw that you were interested in the all new ${
      product.product_name
    }!
      We really want you to have it! Which is why, we want you to have it for, NOT $${
        product.price
      }, but $${parseInt(product.price * 0.75)}!
      Here is some more information about the wicked product!
      ${product.description}
    `,
    html: `<p>We saw that you were interested in the all new <strong>${
      product.product_name
    }</strong>!</p>
    
    <p>We really want you to have it! Which is why, we want you to have it for, NOT $${
      product.price
    }, but $<strong>${parseInt(product.price * 0.75)}</strong>!</p>
    <p>Here is some more information about the wicked product!</p>
    <hr />
    <section>
      ${product.description}
    </section>`,
  };

  return { userEmail, emailContent };
};

const nodemailer = require('nodemailer');

const sendEmail = async (userEmail, emailContent) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'theodora.mcdermott34@ethereal.email',
      pass: 'QezgTJDUqJPJchU3Eu',
    },
  });

  let info = await transporter.sendMail({
    from: '"Bonsai 🌴" <theodora.mcdermott34@ethereal.email>',
    to: userEmail,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html,
  });

  console.log('Message sent: %s', info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

// Turns on consumer
consumeViewProductEvents();

module.exports = consumeViewProductEvents;
