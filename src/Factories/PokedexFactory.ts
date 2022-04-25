import { Router } from 'express';

import { Pokedex } from '../schemas';
import { Authenticator, Validation } from '../middlewares';
import { PokedexModel } from '../models';
import { PokedexService } from '../services';
import { PokedexController } from '../controllers';
import { PokedexRouter } from '../routes';

class PokedexFactory {
  public static createPokedexRouter(): Router {
    const validation = new Validation();
    const authenticator = new Authenticator();
    const pokedexModel = new PokedexModel();
    const pokedexService = new PokedexService(pokedexModel);
    const pokedexController = new PokedexController(pokedexService);
    const pokedexRouter = new PokedexRouter<Pokedex>();
    pokedexRouter.addRoute(pokedexController, validation, authenticator);
    return pokedexRouter.router;
  }
}

export default PokedexFactory;
