import { ZodError } from 'zod';
import { MongoModel } from '../models';

export interface ServiceError {
  error: ZodError;
}

abstract class Service<T> {
  constructor(
    protected model: MongoModel<T>,
  ) { }

  public read = async (): Promise<T | T[] | ServiceError> => this.model.read();

  public readOne = async (_id: number): Promise<T | null | ServiceError> =>
    this.model.readOne(_id);

  public create = async (obj: T): Promise<T> => this.model.create(obj);

  public update = async (_id: number, obj: T): Promise<T | null> => {
    const result = await this.model.update(_id, obj);

    return result;
  };

  public partialUpdate = async (_id: number, obj: T): Promise<T | null> =>
    this.model.partialUpdate(_id, obj);

  public delete = async (_id: number): Promise<T | null> =>
    this.model.delete(_id); 
}

export default Service;
