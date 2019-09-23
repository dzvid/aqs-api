module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sensor_nodes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // Unique node IDentifier
      uid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      eid: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('sensor_nodes');
  },
};
