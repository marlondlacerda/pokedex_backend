import { PokedexModel } from '../models';
import { Pokedex } from '../schemas';
import Service from './Service';

class PokedexService extends Service<Pokedex> {
  constructor(
    readonly model = new PokedexModel(),
  ) {
    super(model);
  }
}

export default PokedexService;
