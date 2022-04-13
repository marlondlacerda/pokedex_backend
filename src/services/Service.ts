import { ZodError } from 'zod';
import { MongoModel } from '../models';

export interface ServiceError {
  error: ZodError;
}

abstract class Service<T> {
  constructor(
    protected model: MongoModel<T>,
  ) { }

  public async read(): Promise<T | T[] | ServiceError> {
    return this.model.read();
  }

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }
}

export default Service;
