import SensorNode from '../models/SensorNode';

class SensorNodeController {
  /**
   * Register a new sensor node in the database.
   */
  async store(req, res) {
    // TODO: Validate inputs

    // Verify if sensor node already exists
    const sensorNodeExits = await SensorNode.findOne({
      where: {
        id_sensor_node: req.body.id_sensor_node,
      },
    });

    if (sensorNodeExits) {
      return res.status(400).json({ error: 'The Sensor Node already exists' });
    }

    // In case it doesnt exists, create a new Sensor Node
    const sensorNodeCreated = await SensorNode.create(req.body);

    return res.json(sensorNodeCreated);
  }
}

export default new SensorNodeController();
