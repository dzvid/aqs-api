import 'dotenv/config';
import express from 'express';

// Rotas da aplicação
import routes from './routes';

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
