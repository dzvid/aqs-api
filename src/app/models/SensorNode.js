import Sequelize, { Model } from 'sequelize';

class SensorNode extends Model {
  // Method automatically called by sequelize at the Model Loader
  static init(sequelize) {
    super.init(
      {
        id_sensor_node: Sequelize.STRING,
        eid: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // Returns the model initialized
    return this;
  }
}

export default SensorNode;
