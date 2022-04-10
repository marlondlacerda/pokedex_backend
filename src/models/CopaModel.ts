import { Schema, model as createModel, Document } from 'mongoose';
import { Copa } from '../schemas';
import MongoModel from './MongoModel';

interface CopaDocument extends Copa, Document {}

const copaSchema = new Schema<CopaDocument>({
  year: {
    type: Number,
    required: true,
  },
  hostCountry: {
    type: String,
    required: true,
  },
  champions: {
    type: String,
    required: true,
  },
  runnerUp: {
    type: String,
    required: true,
  },
  editionGoals: {
    type: Number,
    required: true,
  },
  editionStrikers: {
    type: [String],
    required: true,
  },
  bestPlayer: {
    type: String,
    required: true,
  },
  bestGoalkeeper: {
    type: String,
    required: true,
  },
  bestYoungPlayer: {
    type: String,
    required: true,
  },
});

class CopaModel extends MongoModel<Copa> {
  constructor(
    public model = createModel('tournaments', copaSchema),
  ) {
    super(model);
  }
}

export default CopaModel;
