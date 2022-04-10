import mongoose, { Schema, model as createModel, Document } from 'mongoose';
import { Pokedex } from '../schemas';
import MongoModel from './MongoModel';

mongoose.pluralize(null);

interface PokedexDocument extends Pokedex, Document {}

const pokeSchema = new Schema<PokedexDocument>({
  nome: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },
  ataque: {
    type: Number,
    required: true,
  },
  defesa: {
    type: Number,
    required: true,
  },
  velocidade: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  habilidades: {
    type: [{
      habilidade1: {
        type: String,
        required: true,
      },
      habilidade2: {
        type: String,
        required: true,
      },
    }],
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

class PokedexModel extends MongoModel<Pokedex> {
  constructor(
    public model = createModel('pokedex', pokeSchema),
  ) {
    super(model);
  }
}

export default PokedexModel;
