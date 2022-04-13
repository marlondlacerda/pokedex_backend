import { Router } from 'express';
import CustomRouter from '../routes';
import { Pokedex } from '../schemas';
import { PokedexController } from '../controllers';
import PokedexValidation from '../validations';

class RouterFactory {
  public static createPokedexRouter(): Router {
    const pokedexValidation = new PokedexValidation();
    const pokedexController = new PokedexController();
    const pokedexRouter = new CustomRouter<Pokedex>();
    pokedexRouter.addRoute(pokedexController, pokedexValidation);
    return pokedexRouter.router;
  }
}

export default RouterFactory;
