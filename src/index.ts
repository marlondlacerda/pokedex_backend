import CustomRouter from './routes/Router';
import CopaController from './controllers/CopaController';

import App from './app';
import { Copa } from './schemas';

const server = new App();

const copaController = new CopaController();

const copaRouter = new CustomRouter<Copa>();

copaRouter.addRoute(copaController);

server.addRouter(copaRouter.router);

server.startServer();
