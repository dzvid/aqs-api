import mqtt from 'mqtt';

import api from '../api/api';

import mqttConfig from '../../config/mqtt';

class MqttHandler {
  constructor() {
    const { brokerUrl, username, password, resubscribe } = mqttConfig;

    this.mqttClient = mqtt.connect(brokerUrl, {
      username,
      password,
      resubscribe,
    });

    this.init();
  }

  /**
   * Configure MQTT Client callback methods
   */
  init() {
    // MQTT Connection handler
    this.mqttClient.on('connect', () => {
      console.log('MQTT client connected!');
    });

    // MQTT error callback
    this.mqttClient.on('error', err => {
      console.log(`Cant connect: ${err}`);
      this.mqttClient.end();
    });

    // MQTT subscription handler
    this.mqttClient.subscribe(mqttConfig.topics);

    // MQTT handler on disconnections from the broker
    this.mqttClient.on('close', () => {
      console.log('MQTT client disconnected!');
    });
  }

  /**
   * Process incoming messages
   */
  processMessages() {
    this.mqttClient.on('message', (topic, message) => {
      this.bridgeMqttToHttp(topic, message);
    });
  }

  /**
   * Sends the MQTT message to the HTTP REST API server.
   */
  async bridgeMqttToHttp(topic, message) {
    try {
      const messageJSON = JSON.parse(message);

      await api.post('/readings', {
        ...messageJSON,
      });
    } catch (error) {
      console.log('FAILED TO PROCESS MESSAGE! ', error);
    }
  }
}

export default new MqttHandler();
