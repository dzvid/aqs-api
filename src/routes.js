import { Router } from 'express';

// Improt controllers
import SensorNodeController from './app/controllers/SensorNodeController';

const routes = new Router();

// ROUTES DEFINITION
routes.post('/sensor_nodes', SensorNodeController.store);

// Export our routes
export default routes;
