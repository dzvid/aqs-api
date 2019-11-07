import { Router } from 'express';

// Validation middleware
import schemaValidator from './app/middlewares/SchemaValidator';

// Validation schemas
import SensorNodeSchema from './app/validations/SensorNodeSchema';

// Import controllers
import SensorNodeController from './app/controllers/SensorNodeController';
import ReadingController from './app/controllers/ReadingController';

const routes = new Router();

// ROUTES DEFINITION

// Registers a new sensor node in the system.
routes.post(
  '/sensor_nodes',
  schemaValidator(SensorNodeSchema.store, 'body'),
  SensorNodeController.store
);

// Registers a sensor node reading in the database
routes.post('/readings', ReadingController.store);

// Export our routes
export default routes;
