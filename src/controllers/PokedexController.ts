import { PokedexWithID } from '../schemas';
import Controller from './Controller';
import { PokedexService } from '../services';

class PokedexController extends Controller<PokedexWithID> {
  private $route: string;

  constructor(
    readonly service = new PokedexService(),
    route = '/pokedex',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }
}

export default PokedexController;
