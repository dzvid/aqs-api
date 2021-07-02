import { Router } from 'express';

import { readingsRoutes } from './readings.routes';
import { sensorNodeRoutes } from './sensorNodes.routes';

const router = Router();

router.use('/sensor-nodes', sensorNodeRoutes);
router.use('/sensor-nodes/:sensor_node_id/readings', readingsRoutes);

export { router };
