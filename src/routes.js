import { Router } from 'express';

import schemaValidator from './app/middlewares/SchemaValidator';
import authMiddleware from './app/middlewares/auth';

import SensorNodeSchema from './app/validations/SensorNodeSchema';
import ReadingSchema from './app/validations/ReadingSchema';

import SensorNodeController from './app/controllers/SensorNodeController';
import ReadingController from './app/controllers/ReadingController';

const routes = new Router();

// Show a sensor node information
routes.get(
  '/sensor_nodes/:uuid',
  schemaValidator(SensorNodeSchema.show, 'params'),
  SensorNodeController.show
);

// List all sensor nodes
routes.get(
  '/sensor_nodes',
  schemaValidator(SensorNodeSchema.index, 'query'),
  SensorNodeController.index
);

// Get all readings colected by a sensor node.
routes.get(
  '/readings/:uuid',
  schemaValidator(ReadingSchema.index, 'params'),
  schemaValidator(ReadingSchema.index, 'query'),
  ReadingController.index
);

routes.use(authMiddleware);

// Registers a new sensor node in the system.
routes.post(
  '/sensor_nodes',
  schemaValidator(SensorNodeSchema.store, 'body'),
  SensorNodeController.store
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

// Registers a sensor node reading in the database
routes.post(
  '/readings',
  schemaValidator(ReadingSchema.store, 'body'),
  ReadingController.store
);

export default routes;
