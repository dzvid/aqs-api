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
    const uuid = uuidv4();

    const eid = `dtn://aqs-sensor-${uuid}.dtn`;

    const { board_model, serial_number, description } = req.body;

    const sensorNodeCreated = await SensorNode.create({
      eid,
      uuid,
      board_model,
      serial_number,
      description,
    });

    return res.json(sensorNodeCreated);
  }
}

export default new SensorNodeController();
