import { ZodError } from 'zod';
import { Model } from '../interfaces';

export interface ServiceError {
  error: ZodError;
}

abstract class Service<T> {
  constructor(
    protected model: Model<T>,
  ) { }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }
}

export default Service;
