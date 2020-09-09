module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sensor_nodes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      location_latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      location_longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      // Timestamps
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('sensor_node');
  },
};
