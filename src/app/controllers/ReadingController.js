import { parseISO, isAfter } from 'date-fns';

import Reading from '../models/Reading';
import SensorNode from '../models/SensorNode';

class ReadingController {
  /**
   * Register a sensor node reading in the database.
   */
  async store(req, res) {
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
    } = req.body;

    // Check if sensor node informed exists
    const sensorNode = await SensorNode.findOne({ where: { uuid } });

    if (!sensorNode) {
      return res.status(404).json({ error: 'Sensor node not found!' });
    }

    // Check if reading was already registered in the database
    const readingExists = await Reading.findOne({
      where: {
        sensor_node_id: sensorNode.id,
        collected_at,
      },
    });

    if (readingExists) {
      return res
        .status(400)
        .json({ error: 'Reading already exists in the database' });
    }

    // Check if collected date is valid (not a date in the future)
    if (isAfter(parseISO(collected_at), new Date())) {
      return res.status(400).json({
        error:
          'Reading with invalid collected date (collected date informed is a future date)',
      });
    }

    // Stores reading in the database
    const readingCreated = await Reading.create({
      sensor_node_id: sensorNode.id,
      humidity,
      temperature,
      pressure,
      ozone,
      pm2_5,
      pm10,
      carbon_monoxide,
      collected_at,
    });

    // Remove the 'sensor node id' from the result before return
    const { sensor_node_id, ...reading } = readingCreated.dataValues;

    return res.json(reading);
  }

  // TODO:needs to be implemented
  async index(req, res) {}

  // TODO:needs to be implemented
  async delete(req, res) {}
}

export default new ReadingController();
