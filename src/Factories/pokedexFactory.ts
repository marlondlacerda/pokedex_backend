import { Router } from 'express';
import { Pokedex } from '../schemas';
import { PokedexController } from '../controllers';
import { PokedexValidation } from '../validations';
import { Authenticator } from '../middlewares';
import { PokedexRouter } from '../routes';

class PokedexFactory {
  public static createPokedexRouter(): Router {
    const pokedexValidation = new PokedexValidation();
    const authenticator = new Authenticator();
    const pokedexController = new PokedexController();
    const pokedexRouter = new PokedexRouter<Pokedex>();
    pokedexRouter.addRoute(pokedexController, pokedexValidation, authenticator);
    return pokedexRouter.router;
  }
}

export default PokedexFactory;
