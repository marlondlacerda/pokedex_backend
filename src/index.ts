import CustomRouter from './routes/Router';

import App from './app';
import { Pokedex } from './schemas';
import HandlerError from './middlewares/errorHandlerMiddleware';
import PokedexController from './controllers';

const server = new App();

const pokedexController = new PokedexController();
const handleError = new HandlerError();

const pokedexRouter = new CustomRouter<Pokedex>();

pokedexRouter.addRoute(pokedexController);

server.addRouter(pokedexRouter.router);
server.errorRouter(handleError);

server.startServer();
