module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('readings', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      // Sensor FK
      sensor_node_id: {
        type: Sequelize.INTEGER,
        references: { model: 'sensor_nodes', key: 'id' },
        // Update in a sensor node information is reflected in readings table
        onUpdate: 'CASCADE',
        // When sensor node is deleted, all its data collected is deleted
        onDelete: 'CASCADE',
        allowNull: false,
      },

      // Data collected
      ozone: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      pm2_5: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      pm10: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      carbon_monoxide: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      humidity: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      temperature: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      pressure: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      collected_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      // Timestamps
      // created_at is equivalent to the date when data was received by the backend
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
    return queryInterface.dropTable('readings');
  },
};
