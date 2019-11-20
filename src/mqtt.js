import 'dotenv/config';

import mqttClient from './service/mqtt/MqttHandler';

mqttClient.processMessages();
