import { Controller } from '../interfaces/Repositories';
import { Pokedex } from '../schemas';
import PokedexService from '../services';

class PokedexController extends Controller<Pokedex> {
  private $route: string;

  constructor(
    service = new PokedexService(),
    route = '/pokedex',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }
}

export default PokedexController;
