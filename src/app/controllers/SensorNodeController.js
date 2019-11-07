import uuidv4 from 'uuid/v4';

import SensorNode from '../models/SensorNode';

class SensorNodeController {
  // /**
  //  * @api {POST} /sensor_nodes Registers a new sensor node in the system. Each node has an
  //  * @apiName PostUser
  //  * @apiGroup Sensor Node
  //  *
  //  * @apiParam {String} board_model Model name of the board used to develop the sensor node (e.g: Raspberry Pi Zero W, Arduino Uno, etc).
  //  * @apiParam {String} board_model Model name of the board used to develop the sensor node (e.g: Raspberry Pi Zero W, Arduino Uno, etc).
  //  * @apiParam {String} board_model Model name of the board used to develop the sensor node (e.g: Raspberry Pi Zero W, Arduino Uno, etc).
  //  * @apiParam {String} board_model Model name of the board used to develop the sensor node (e.g: Raspberry Pi Zero W, Arduino Uno, etc).
  //  *
  //  */
  async store(req, res) {
    const { board_model, serial_number, description } = req.body;

    const uuid = uuidv4();

    const eid = `dtn://aqs-sensor-${uuid}.dtn`;

    const sensorNodeCreated = await SensorNode.create({
      eid,
      uuid,
      board_model,
      serial_number,
      description,
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
   * Delete a sensor node from the system based on uuid.
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
}

export default new SensorNodeController();
