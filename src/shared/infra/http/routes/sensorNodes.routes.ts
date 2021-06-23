import { CreateSensorNodeController } from '@modules/sensorNodes/useCases/createSensorNode/CreateSensorNodeController';
import { Router } from 'express';

const sensorNodeRoutes = Router();
const createSensorNodeController = new CreateSensorNodeController();

sensorNodeRoutes.post('/', createSensorNodeController.handle);

export { sensorNodeRoutes };
