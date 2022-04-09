import mongoose from 'mongoose';
import { ICopa } from '../interfaces';
import CopaSchema from '../schemas';

export default class CopaModel {
  constructor(
    public model = mongoose.model('tournaments', CopaSchema),
  ) {}

  public async getCopa(): Promise<ICopa[]> {
    const tournaments = await this.model.find();
    return tournaments;
  }
}
