import Sequelize from 'sequelize';

// Import models
import SensorNode from '../app/models/SensorNode';
import Reading from '../app/models/Reading';

import databaseConfig from '../config/database';

// List of Models to be initialized/loaded
const models = [SensorNode, Reading];

class Database {
  constructor() {
    this.init();
  }

  /**
   * Connects to the database, initialize/load the models and respective
   * relationships between models (if there is any).
   */
  init() {
    // Database connection
    this.connection = new Sequelize(databaseConfig);

    // Load the models and relationships (if there are some)
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
