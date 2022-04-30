import mongoose, { Schema, model as createModel, Document } from 'mongoose';
import { Pokedex } from '../schemas';
import MongoModel from './MongoModel';

mongoose.pluralize(null);

interface PokedexDocument extends Pokedex, Document {}

const pokeSchema = new Schema<PokedexDocument>({
  _id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: [{
    type: String,
    required: true,
  }],
  strAg: [{
    type: String,
    required: true,
  }],
  weakAg: [{
    type: String,
    required: true,
  }],
  height: {
    value: {
      type: Number,
      required: true,
    },
    measurement: {
      type: String,
      required: true,
    },
  },
  weight: {
    value: {
      type: Number,
      required: true,
    },
    measurement: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  baseStats: {
    hp: {
      type: Number,
      required: true,
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
    skill1: {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      pwr: {
        type: Number,
        required: true,
      },
      acc: {
        type: Number,
        required: true,
      },
      pp: {
        type: Number,
        required: true,
      },
    },
    skill2: {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      pwr: {
        type: Number,
        required: true,
      },
      acc: {
        type: Number,
        required: true,
      },
      pp: {
        type: Number,
        required: true,
      },
    },
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  _id: false,
});

export class PokedexModel extends MongoModel<Pokedex> {
  constructor(
    readonly model = createModel('pokedex', pokeSchema),
  ) {
    super(model);
  }
}

export default PokedexModel;
