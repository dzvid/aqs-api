module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('readings', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      sensor_node_id: {
        type: Sequelize.INTEGER,
        references: { model: 'sensor_nodes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
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
      relative_humidity: {
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
        unique: true,
        allowNull: false,
      },
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
