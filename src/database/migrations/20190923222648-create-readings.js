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
      humidity: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      temperature: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      pressure: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      ozone: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      pm25: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      carbon_monoxide: {
        type: Sequelize.DOUBLE,
        allowNull: false,
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
