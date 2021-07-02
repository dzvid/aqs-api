import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateReadingUseCase } from './CreateReadingUseCase';

export class CreateReadingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      collected_at,
      pm10,
      pm25,
      pressure,
      relative_humidity,
      temperature,
    } = request.body;

    const { sensor_node_id } = request.params;

    const createReadingUseCase = container.resolve(CreateReadingUseCase);

    const reading = await createReadingUseCase.execute({
      sensor_node_id,
      collected_at,
      pm10,
      pm25,
      pressure,
      relative_humidity,
      temperature,
    });

    return response.status(201).send(reading);
  }
}
