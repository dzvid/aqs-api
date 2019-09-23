import SensorNode from '../models/SensorNode';

class SensorNodeController {
  /**
   * Register a new sensor node in the database.
   */
  async store(req, res) {
    // Fetch the uid and eid from request
    const { uid, eid } = req.body;

    // Verify if sensor node already exists
    const sensorNodeExists = await SensorNode.findOne({
      where: {
        uid,
      },
    });

    if (sensorNodeExists) {
      return res.status(400).json({
        message: 'Sensor Node informed already exists',
        data: {
          uid,
          eid,
        },
      });
    }

    // In case it doesnt exists, create a new sensor node
    const sensorNodeCreated = await SensorNode.create(req.body);

    return res.status(200).json({
      message: 'Sensor node created successfuly',
      data: sensorNodeCreated,
    });
  }
}

export default new SensorNodeController();
