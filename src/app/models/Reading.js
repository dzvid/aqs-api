import Sequelize, { Model } from 'sequelize';

class Reading extends Model {
  static init(sequelize) {
    super.init(
      {
        // Data collected
        humidity: Sequelize.DOUBLE,
        temperature: Sequelize.DOUBLE,
        pressure: Sequelize.DOUBLE,
        ozone: Sequelize.DOUBLE,
        pm2_5: Sequelize.DOUBLE,
        pm10: Sequelize.DOUBLE,
        carbon_monoxide: Sequelize.DOUBLE,
        collected_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    // Returns the model created
    return this;
  }

  // Defines a relationship between tables sensor_nodes and readings, add FK in readings
  static associate(models) {
    this.belongsTo(models.SensorNode, {
      foreignKey: 'sensor_node_id',
      as: 'sensor_node',
    });
  }
}

export default Reading;
