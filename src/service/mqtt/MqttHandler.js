import mqtt from 'mqtt';

import api from '../api/api';

import mqttConfig from '../../config/mqtt';

import '../../database';

import ReadingSchema from '../../app/validations/ReadingSchema';
import Reading from '../../app/models/Reading';

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
    const {
      brokerUrl,
      username,
      password,
      resubscribe,
      clientId,
      clean,
    } = mqttConfig;

    this.mqttClient = mqtt.connect(brokerUrl, {
      username,
      password,
      resubscribe,
      clientId,
      clean,
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
      // convert JSON message Buffer to valid JSON (object)
      const messageJSON = JSON.parse(message);

      // Validates reading schema, if valid store in database
      if (await ReadingSchema.store.publish.validate(messageJSON)) {
        const {
          uuid,
          humidity,
          temperature,
          pressure,
          ozone,
          pm2_5,
          pm10,
          carbon_monoxide,
          collected_at,
        } = messageJSON;

        const result = await Reading.create({
          uuid,
          humidity,
          temperature,
          pressure,
          ozone,
          pm2_5,
          pm10,
          carbon_monoxide,
          collected_at,
        });
        console.log('READING SAVED IN DATABASE!:\n', result);
      } else {
        console.log('INVALID READING FORMAT: ', messageJSON);
      }
    } catch (error) {
      if (error) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('FAILED TO PROCESS THE READING: \n', error);
      }
    }
  }
}

export default new MqttHandler();
