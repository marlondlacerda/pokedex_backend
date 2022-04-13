import { Request, Response } from 'express';
import { PokedexWithID } from '../schemas';
import Controller from './Controller';
import { PokedexService } from '../services';

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
    res: Response,
  ): Promise<any> => {
    console.log(req.body);
    
    await this.service.read();
    res.status(200).json('created');
  };
}

export default PokedexController;
