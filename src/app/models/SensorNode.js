import Sequelize, { Model } from 'sequelize';

class SensorNode extends Model {
  // Method automatically called by sequelize at the Model Loader
  static init(sequelize) {
    super.init(
      {
        uuid: Sequelize.UUID,
        eid: {
          type: Sequelize.VIRTUAL,
          get() {
            return `dtn://aqs-sensor-${this.uuid}.dtn`;
          },
        },
        location_latitude: Sequelize.DOUBLE,
        location_longitude: Sequelize.DOUBLE,
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
