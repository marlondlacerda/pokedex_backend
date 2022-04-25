import { Pokedex } from '../schemas';
import Controller from './Controller';
import { PokedexService } from '../services';

class PokedexController extends Controller<Pokedex> {
  private $route: string;

  constructor(
    readonly service: PokedexService,
    route = '/pokedex',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }
}

export default PokedexController;
