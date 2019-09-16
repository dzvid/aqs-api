const mqtt = require("mqtt");

class MqttHandler {
  constructor(
    brokerUrl = "mqtt://192.168.0.40",
    username = "",
    password = "",
    topics = {
      sensor_data: { qos: 1 }
    }
  ) {
    this.mqttClient = null;
    //broker address
    this.brokerUrl = brokerUrl;
    this.username = username;
    this.password = password;
    this.topics = topics;
  }

  // Connect MQTT with credentials if needed
  connect() {
    // Connect MQTT with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.brokerUrl, {
      username: this.username,
      password: this.password
    });

    // MQTT Connection callback
    this.mqttClient.on("connect", () => {
      console.log("MQTT client connected!");
    });

    // MQTT error callback
    this.mqttClient.on("error", err => {
      console.log("Cant connect: " + err);
      this.mqttClient.end();
      // process.exit(1);
    });

    // MQTT subscriptions
    this.mqttClient.subscribe(this.topics);

    // MQTT handler when a message arrives
    this.mqttClient.on("message", this.processIncomingMessages);

    // MQTT Handler on disconnections from the broker
    this.mqttClient.on("close", () => {
      console.log("MQTT client disconnected!");
    });
  }

  // Sends a mqtt message to a topic
  // default QoS is 1 and retain flag is enabled
  sendMessage(topic, message, qos = true, retain = 1) {
    if (topic && message) {
      this.mqttClient.publish(topic, message, { qos, retain });
    } else {
      console.warn("Message not sent! Topic/Message have to be defined!");
    }
  }

  // Process a message when it arrives
  processIncomingMessages(topic, message) {
    console.log("---New message received!---");
    console.log("Topic: " + topic);
    console.log("Message: " + message.toString());
  }
}

module.exports = MqttHandler;
