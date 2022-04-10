import { ZodError } from 'zod';
import Model from './Models';

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
}

export default Service;
