const kafka = require('kafka-node');

const config = {
  KAFKA_HOST: 'localhost:9092',
  KAFKA_TOPIC_NAME: 'view-product-topic',
  CLIENT_ID: 'bonsai_kafka',
};

/*
 * The code below is from: https://blog.logrocket.com/real-time-data-streaming-app-apache-kafka/
 * I've actually looked at this article in the past as well, and even tried to create a PR:
 * https://github.com/firebase007/kafka_producer_consumer_tutorial/pull/3
 */

const client = new kafka.KafkaClient({ kafkaHost: config.KAFKA_HOST });

const topicToCreate = [
  {
    topic: config.KAFKA_TOPIC_NAME,
    partitions: 1,
    replicationFactor: 1,
  },
];

client.createTopics(topicToCreate, (error, result) => {
  // result is an array of any errors if a given topic could not be created
  console.log(result, `Topic ${config.KAFKA_TOPIC_NAME} created successfully.`);
});
