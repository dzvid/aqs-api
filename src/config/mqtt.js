export default {
  brokerUrl: process.env.MQTT_BROKER_URL,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASS,
  clientId: process.env.MQTT_SERVER_ID,
  topics: { '/readings': { qos: 1 } },
  resubscribe: true,
  clean: false,
};
