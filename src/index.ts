import CustomRouter from './routes/Router';
import CopaController from './controllers/CopaController';

import App from './app';
import { Copa } from './schemas';
import HandlerError from './middlewares/errorHandlerMiddleware';

const server = new App();

const copaController = new CopaController();
const handleError = new HandlerError();

const copaRouter = new CustomRouter<Copa>();

copaRouter.addRoute(copaController);

server.addRouter(copaRouter.router);
server.errorRouter(handleError);

server.startServer();
