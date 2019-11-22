import mqtt from 'mqtt';

import api from '../api/api';

import mqttConfig from '../../config/mqtt';

/**
 * Check if the value is valid JSON.
 * @param {any} input
 */
function isInputJSON(input) {
  try {
    const json = JSON.parse(input);
    return typeof json === 'object';
  } catch (e) {
    return false;
  }
}
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
   * Sends the MQTT message to the HTTP REST API server. The MQTT topic to publish the data
   * matches the API endpoint to process the sensor data.
   */
  async bridgeMqttToHttp(topic, message) {
    try {
      const messageJSON = isInputJSON(message) ? message : JSON.parse(message);

      const response = await api.post(topic, {
        ...messageJSON,
      });

      console.log('DATA SAVED IN DATABASE!\n');
      console.log('HTTP STATUS: \n', response.status);
      console.log('DATA: \n', response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('-----------------RESPONSE ERROR----------------');
        console.log('HTTP STATUS: \n', error.response.status);
        console.log('DATA: \n', error.response.data);
        console.log('HEADERS: \n', error.response.headers);
        console.log('------------------------------------------------');
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('-----------------REQUEST ERROR----------------');
        console.log(error.request);
        console.log('-------------------------------------------------');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('----------------------ERROR----------------------');
        console.log('Error', error.message);
        console.log('-------------------------------------------------');
      }
    }
  }
}

export default new MqttHandler();
