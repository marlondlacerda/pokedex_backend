import App from './app';
import { HandlerError, ZodHandlerError } from './middlewares';

import RouterFactory from './Factories/pokedexFactory';

const server = new App();

const handleError = new HandlerError();
const zodHandlerError = new ZodHandlerError();

const pokedexFactory = RouterFactory.createPokedexRouter();

server.addRouter(pokedexFactory);
server.errorRouter(handleError, zodHandlerError);

server.startServer();
