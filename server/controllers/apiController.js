const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile } = require('../utils/helpers');

const apiController = {};

apiController.createOrder = async (req, res, next) => {
  const checkoutInfo = req.body;
  const order = {
    orderId: uuidv4(),
    ...checkoutInfo,
  };
  readFromFile('../../orders.json', (err, data) => {
    if (err) {
      return next({
        log: err,
        message: { err: 'An error occurred when reading file' },
      });
    }
    const previousOrders = data ? JSON.parse(data) : [];
    previousOrders.push(order);
    writeToFile('../../orders.json', previousOrders);
  });

  return next();
};

module.exports = apiController;
