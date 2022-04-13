import { Router } from 'express';
import CustomRouter from '../routes';
import { Pokedex } from '../schemas';
import { PokedexController } from '../controllers';
import PokedexValidation from '../validations';
import { Authenticator } from '../middlewares';

class RouterFactory {
  public static createPokedexRouter(): Router {
    const pokedexValidation = new PokedexValidation();
    const authenticator = new Authenticator();
    const pokedexController = new PokedexController();
    const pokedexRouter = new CustomRouter<Pokedex>();
    pokedexRouter.addRoute(pokedexController, pokedexValidation, authenticator);
    return pokedexRouter.router;
  }
}

export default RouterFactory;
