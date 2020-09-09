import uuidv4 from 'uuid/v4';

import SensorNode from '../models/SensorNode';

class SensorNodeController {
  /**
   * Creates a new sensor node.
   */
  async store(req, res) {
    const { location_latitude, location_longitude } = req.body;

    const uuid = uuidv4();

    const sensorNodeCreated = await SensorNode.create({
      uuid,
      location_latitude,
      location_longitude,
    });

    return res.json(sensorNodeCreated);
  }

  /**
   * Shows a sensor node information based on uuid.
   */
  async show(req, res) {
    const { uuid } = req.params;

    const sensorNodeExists = await SensorNode.findOne({
      where: { uuid },
    });

    if (!sensorNodeExists) {
      return res.status(404).json({ error: 'Sensor node not found!' });
    }

    return res.json(sensorNodeExists);
  }

  /**
   * Deletes a sensor node from the system based on uuid.
   */
  async delete(req, res) {
    const { uuid } = req.params;

    const sensorNodeDeleted = await SensorNode.destroy({
      where: { uuid },
    });

    if (!sensorNodeDeleted) {
      return res.status(404).json({ error: 'Sensor node not found!' });
    }

    return res.json({
      message: `Sensor node with uuid = ${uuid} excluded from the system.`,
    });
  }

  /**
   *
   * Updates a node sensor informations (location_latitude, location_longitude).
   * The fields are all optional.
   *
   */
  async update(req, res) {
    const { uuid } = req.params;
    const { location_latitude, location_longitude } = req.body;

    const sensorNode = await SensorNode.findOne({ where: { uuid } });

    if (!sensorNode) {
      return res.status(404).json({ error: 'Sensor node not found!' });
    }

    await sensorNode.update({ location_latitude, location_longitude });

    return res.json(sensorNode);
  }

  /**
   * List all sensor nodes. Results are paginated by 20 items by page.
   */
  async index(req, res) {
    // In case page wasnt declared, defaults to 1
    const page = req.query.page > 1 ? req.query.page : 1;

    const sensor_nodes = await SensorNode.findAll({
      order: ['id'],
      limit: 20,
      offset: 20 * page - 20,
    });

    return res.json({ page, sensor_nodes });
  }
}

export default new SensorNodeController();
