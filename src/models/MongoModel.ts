import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/Repositories';

abstract class MongoModel<T> implements Model<T> {
  constructor(
    protected model: M<T & Document>,
  ) { }

  read = async (): Promise<T[]> => this.model.find({}, { _id: 0 });
}

export default MongoModel;
