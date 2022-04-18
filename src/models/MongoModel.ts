import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces';

abstract class MongoModel<T> implements Model<T> {
  constructor(
    readonly model: M<T & Document>,
  ) { }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find({}, {}, { lean: true });

  readOne = async (_id: number): Promise<T | null> =>
    this.model.findOne({ _id }, {}, { lean: true });

  update = async (_id: number, obj: T): Promise<T | null> =>
    this.model.findByIdAndUpdate(_id, obj, { new: true, lean: true });

  partialUpdate = async (_id: number, obj: T): Promise<T | null> =>
    this.model.findOneAndUpdate(
      { _id },
      { $set: obj },
      { new: true, lean: true },
    );

  delete = async (_id: number): Promise<T | null> =>
    this.model.findByIdAndDelete(_id, { lean: true });
}

export default MongoModel;
