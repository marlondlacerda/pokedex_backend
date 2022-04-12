import CustomRouter from './routes';
import { PokedexController } from './controllers';

import App from './app';
import { Pokedex } from './schemas';
import { HandlerError, ZodHandlerError } from './middlewares';
import PokedexValidation from './validations';

const server = new App();

const pokedexValidation = new PokedexValidation();

const pokedexController = new PokedexController();
const handleError = new HandlerError();
const zodHandlerError = new ZodHandlerError();

const pokedexRouter = new CustomRouter<Pokedex>();

pokedexRouter.addRoute(
  pokedexController, 
  pokedexValidation,
);

server.addRouter(pokedexRouter.router);
server.errorRouter(handleError, zodHandlerError);

server.startServer();
