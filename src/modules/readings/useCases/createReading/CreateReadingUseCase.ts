import { Reading } from '@modules/readings/entities/Reading';
import { IReadingsRepository } from '@modules/readings/repositories/IReadingsRepository';
import { inject, injectable } from 'tsyringe';

import { ICreateReadingDTO } from './ICreateReadingDTO';

// @injectable()
export class CreateReadingUseCase {
  constructor(
    // @inject('ReadingsRepository')
    private readingsRepository: IReadingsRepository
  ) {}

  async execute(data: ICreateReadingDTO): Promise<Reading> {
    const reading = await this.readingsRepository.create(data);

    return reading;
  }
}
