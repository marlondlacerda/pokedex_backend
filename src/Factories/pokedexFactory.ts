import { Router } from 'express';
import { Pokedex } from '../schemas';
import { PokedexController } from '../controllers';
import { PokedexValidation } from '../validations';
import { Authenticator } from '../middlewares';
import { PokedexRouter } from '../routes';
import { PokedexModel } from '../models';
import { PokedexService } from '../services';

class PokedexFactory {
  public static createPokedexRouter(): Router {
    const pokedexValidation = new PokedexValidation();
    const authenticator = new Authenticator();
    const pokedexModel = new PokedexModel();
    const pokedexService = new PokedexService(pokedexModel);
    const pokedexController = new PokedexController(pokedexService);
    const pokedexRouter = new PokedexRouter<Pokedex>();
    pokedexRouter.addRoute(pokedexController, pokedexValidation, authenticator);
    return pokedexRouter.router;
  }
}

export default PokedexFactory;
