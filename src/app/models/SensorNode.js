import Sequelize, { Model } from 'sequelize';

class SensorNode extends Model {
  // Method automatically called by sequelize at the Model Loader
  static init(sequelize) {
    super.init(
      {
        eid: Sequelize.STRING,
        uuid: Sequelize.UUID,
        board_model: Sequelize.STRING,
        serial_number: Sequelize.STRING,
        description: Sequelize.STRING,
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
