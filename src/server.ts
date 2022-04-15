import App from './app';
import { LoginFactory, PokedexFactory } from './Factories';
import { HandlerError, ZodHandlerError } from './middlewares';

const server = new App();

const handleError = new HandlerError();
const zodHandlerError = new ZodHandlerError();

const loginFactory = LoginFactory.createLoginRouter();
const pokedexFactory = PokedexFactory.createPokedexRouter();

server.addRouter(loginFactory);
server.addRouter(pokedexFactory);

server.errorRouter(handleError, zodHandlerError);

server.startServer();
