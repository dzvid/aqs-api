const MqttHandler = require("./mqtt/MqttHandler");

const mqttClientServer = new MqttHandler();

mqttClientServer.connect();
