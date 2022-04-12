import mongoose, { Schema, model as createModel, Document } from 'mongoose';
import { Pokedex } from '../schemas';
import MongoModel from './MongoModel';

mongoose.pluralize(null);

interface PokedexDocument extends Pokedex, Document {}

const pokeSchema = new Schema<PokedexDocument>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  baseStats: {
    hp: {
      type: Number,
      require: true,
    },
    atk: {
      type: Number,
      require: true,
    },
    def: {
      type: Number,
      require: true,
    },
    satk: {
      type: Number,
      require: true,
    },
    sdef: {
      type: Number,
      require: true,
    },
    spd: {
      type: Number,
      require: true,
    },
  },
  moves: {
    ability1: {
      type: String,
      require: true,
    },
    ability2: {
      type: String,
      require: true,
    },
  },
});

export class PokedexModel extends MongoModel<Pokedex> {
  constructor(
    public model = createModel('pokedex', pokeSchema),
  ) {
    super(model);
  }
}

export default PokedexModel;
