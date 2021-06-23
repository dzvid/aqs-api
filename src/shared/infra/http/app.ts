import '@config/environment';
import 'reflect-metadata';
import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

/** Dependency injection */
import '@shared/container';

import errorHandler from '@shared/infra/http/middlewares/errorHandler';
import { router } from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

import swaggerConfig from '../../../swagger.json';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use('/v1', router);
app.use(errorHandler);

export { app };
