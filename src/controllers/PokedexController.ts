import { Request, Response } from 'express';
import { Controller } from '../interfaces/Repositories';
import { PokedexWithID } from '../schemas';
import PokedexService from '../services';

class PokedexController extends Controller<PokedexWithID> {
  private $route: string;

  constructor(
    service = new PokedexService(),
    route = '/pokedex',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: Request<PokedexWithID>,
    res: Response<string>,
  ): Promise<typeof res> => res.json(this.$route);
}

export default PokedexController;
