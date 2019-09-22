import 'dotenv/config';
import express from 'express';

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
  }

  middlewares() {
    // Configure express to use requests/responses in json format
    this.server.use(express.json());
  }

  routes() {
    // Configure server routes
    this.server.use(routes);
  }
}

export default new App().server;
