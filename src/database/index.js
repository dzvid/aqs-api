import Sequelize from 'sequelize';

import SensorNode from '../app/models/SensorNode';

import databaseConfig from '../config/database';

// List of Models to be initialized/loaded
const models = [SensorNode];

class Database {
  constructor() {
    this.init();
  }

  /**
   * Connects to the database, initialize and load the models
   */
  init() {
    // Database connection
    this.connection = new Sequelize(databaseConfig);

    // Load the models
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
