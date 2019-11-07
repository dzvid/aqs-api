module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sensor_nodes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      eid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      uuid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },

      board_model: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      serial_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('sensor_nodes');
  },
};
