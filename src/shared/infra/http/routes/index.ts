import { Router } from 'express';

import { sensorNodeRoutes } from './sensorNodes.routes';

const router = Router();

router.use('/sensor-nodes', sensorNodeRoutes);

export { router };
