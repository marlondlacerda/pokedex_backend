import { PokedexModel } from '../models';
import { Pokedex } from '../schemas';
import Service from './Service';

class PokedexService extends Service<Pokedex> {
  constructor(
    public model = new PokedexModel(),
  ) {
    super(model);
  }

  public read = async (): Promise<Pokedex[]> => {
    const result = await this.model.read();

    return result;
  };
}

export default PokedexService;
