import { parseISO, isAfter, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Reading from '../models/Reading';
import SensorNode from '../models/SensorNode';

class ReadingController {
  /**
   * Register a sensor node reading in the database.
   */
  async store(req, res) {
    const {
      sensor_node: { uuid },
      reading: {
        relative_humidity,
        temperature,
        pressure,
        ozone,
        pm2_5,
        pm10,
        carbon_monoxide,
        collected_at,
      },
    } = req.body;

    const parsedCollectDate = parseISO(collected_at);

    // Check if sensor node informed exists
    const sensorNode = await SensorNode.findOne({
      where: { uuid },
    });

    if (!sensorNode) {
      return res.status(404).json({ error: 'Sensor node not found!' });
    }

    // Check if reading was already registered in the database
    const readingExists = await Reading.findOne({
      where: {
        sensor_node_id: sensorNode.id,
        collected_at: parsedCollectDate,
      },
    });

    if (readingExists) {
      return res
        .status(400)
        .json({ error: 'Reading already exists in the database!' });
    }

    // Check if collected date is valid (not a date in the future)
    if (isAfter(parsedCollectDate, new Date())) {
      return res.status(400).json({
        error:
          'Reading with invalid collected date (collected date informed is a future date)!',
      });
    }

    await Reading.create({
      sensor_node_id: sensorNode.id,
      relative_humidity,
      temperature,
      pressure,
      ozone,
      pm2_5,
      pm10,
      carbon_monoxide,
      collected_at: parsedCollectDate,
    });

    return res.status(201);
  }

  /**
   * Get all readings colected by a sensor node in a given day (considers the time
   * between 00:00:00 and 23:59:59).
   * Returns the sensor node uuid, the date of the readings, the total of readings collected in the day
   * and the readings are returned from the most recent to the oldest reading of the day.
   */
  async index(req, res) {
    const { uuid } = req.params;
    const { date } = req.query;

    // Check if sensor node informed exists
    const sensorNode = await SensorNode.findOne({ where: { uuid } });

    if (!sensorNode) {
      return res.status(404).json({ error: 'Sensor node not found!' });
    }

    // Get all readings from the sensor node in the given day.
    const parsedDate = parseISO(date);

    const readings = await Reading.findAndCountAll({
      where: {
        sensor_node_id: sensorNode.id,
        collected_at: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [
        'id',
        'relative_humidity',
        'temperature',
        'pressure',
        'ozone',
        'pm2_5',
        'pm10',
        'carbon_monoxide',
        'collected_at',
      ],
      order: [['collected_at', 'DESC']],
    });

    return res.json({
      sensor_node: { uuid },
      date: parsedDate,
      total_readings: readings.count,
      readings: readings.rows,
    });
  }
}

export default new ReadingController();
