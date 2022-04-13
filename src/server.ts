import App from './app';
import { HandlerError, ZodHandlerError } from './middlewares';

import RouterFactory from './Factories/pokedexFactory';
import { LoginFactory } from './Factories';

const server = new App();

const handleError = new HandlerError();
const zodHandlerError = new ZodHandlerError();

const loginFactory = LoginFactory.creatLoginRouter();
const pokedexFactory = RouterFactory.createPokedexRouter();

server.addRouter(loginFactory);
server.addRouter(pokedexFactory);
server.errorRouter(handleError, zodHandlerError);

server.startServer();
