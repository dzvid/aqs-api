import '@config/environment';
import 'reflect-metadata';
import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

/** Dependency injection */
import '@shared/container';

import errorHandler from '@shared/infra/http/middlewares/errorHandler';
import { router } from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

const swaggerDocumentPath = path.join(__dirname, '../../../swagger.yaml');
const swaggerDocument = yaml.load(swaggerDocumentPath);

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.use(errorHandler);

export { app };
