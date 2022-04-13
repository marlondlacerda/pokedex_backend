import { PokedexModel } from '../models';
import { Pokedex } from '../schemas';
import Service from './Service';

class PokedexService extends Service<Pokedex> {
  constructor(
    protected model = new PokedexModel(),
  ) {
    super(model);
  }

  readonly read = async (): Promise<Pokedex[]> => this.model.read();
}

export default PokedexService;
