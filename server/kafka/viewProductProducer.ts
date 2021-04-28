const { Kafka } = require('kafkajs');

const config = {
  KAFKA_HOST: 'localhost:9092',
  KAFKA_TOPIC_NAME: 'view-product-topic',
  CLIENT_ID: 'bonsai_kafka',
};

const kafka = new Kafka({
  clientId: config.CLIENT_ID,
  brokers: [config.KAFKA_HOST],
});

const producer = kafka.producer();

// we define an async function that writes a new message each second

interface argMessageObj {
  user_id: string;
  id: number;
}

const produceViewProductEvent = (messageObj: argMessageObj) => {
  const produce = async () => {
    await producer.connect();

    // after the produce has connected, we start an interval timer
    try {
      // send a message to the configured topic with
      await producer.send({
        topic: config.KAFKA_TOPIC_NAME,
        messages: [
          {
            key: JSON.stringify({ messageObj, timestamp: Date.now() }),
            value: JSON.stringify(messageObj),
          },
        ],
      });

      console.log(`Message has been written: ${messageObj}`);
    } catch (err) {
      console.error(`Error publishing message: ${err}`);
    }
  };

  produce();
};

module.exports = produceViewProductEvent;
