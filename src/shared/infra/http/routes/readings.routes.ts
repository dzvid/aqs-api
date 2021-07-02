import { CreateReadingController } from '@modules/readings/useCases/createReading/CreateReadingController';
import { Router } from 'express';

const readingsRoutes = Router({ mergeParams: true });
const createReadingController = new CreateReadingController();

readingsRoutes.post('/', createReadingController.handle);

export { readingsRoutes };
