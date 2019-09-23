import { Router } from 'express';

// Validation schemas
import schemas from './app/schemas/schemas';

// Validation middleware
import schemaValidator from './app/middlewares/SchemaValidator';

// Import controllers
import SensorNodeController from './app/controllers/SensorNodeController';

const routes = new Router();

// ROUTES DEFINITION

// Creates a new sensor node
routes.post(
  '/sensor_nodes',
  schemaValidator(schemas.sensorNode.store, 'body'),
  SensorNodeController.store
);

// Export our routes
export default routes;
