import App from './app';
import { LoginFactory, PokedexFactory } from './Factories';
import { HandlerError } from './middlewares';

const server = new App();

const handleError = new HandlerError();

const loginFactory = LoginFactory.createLoginRouter();
const pokedexFactory = PokedexFactory.createPokedexRouter();

server.addRouter(loginFactory);
server.addRouter(pokedexFactory);

server.errorRouter(handleError);

server.startServer();
