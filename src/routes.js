import { Router } from 'express';

// Validation middleware
import schemaValidator from './app/middlewares/SchemaValidator';

// Validation schemas
import SensorNodeSchema from './app/validations/SensorNodeSchema';
import ReadingSchema from './app/validations/ReadingSchema';

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

// Show a sensor node information
routes.get(
  '/sensor_nodes/:uuid',
  schemaValidator(SensorNodeSchema.show, 'params'),
  SensorNodeController.show
);

// Delete a sensor node from the system
routes.delete(
  '/sensor_nodes/:uuid',
  schemaValidator(SensorNodeSchema.delete, 'params'),
  SensorNodeController.delete
);

// Updates a node sensor informations
routes.put(
  '/sensor_nodes/:uuid',
  schemaValidator(SensorNodeSchema.update, 'params'),
  schemaValidator(SensorNodeSchema.update, 'body'),
  SensorNodeController.update
);

// List all sensor nodes
routes.get(
  '/sensor_nodes',
  schemaValidator(SensorNodeSchema.index, 'query'),
  SensorNodeController.index
);

// Registers a sensor node reading in the database
routes.post(
  '/readings',
  schemaValidator(ReadingSchema.store, 'body'),
  ReadingController.store
);

// Export our routes
export default routes;
