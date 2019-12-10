import 'dotenv/config';
import express from 'express';
import 'express-async-errors';

// Application Routes
import routes from './routes';

// Imports the Models Loader
import './database';

class App {
  constructor() {
    // Iniciamos o servidor
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // Configure express to use requests/responses in json format
    this.server.use(express.json());
  }

  routes() {
    // Configure server routes
    this.server.use(routes);
  }

  /**
   * Method to handle errors
   */
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
