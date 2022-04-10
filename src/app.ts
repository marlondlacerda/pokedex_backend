import express, { Router } from 'express';
import 'express-async-errors';
import Connection from './models/config';
import HandlerError from './middlewares/errorHandlerMiddleware';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  public startServer(port = 3000) {
    Connection();
    const actualPort = process.env.PORT || port;
    return this.app.listen(
      actualPort,
      () => console.log('Estamos online na porta: ', actualPort),
    );
  }

  public addRouter(router: Router) {
    this.app.use(express.json());
    this.app.use(router);
  }

  public errorRouter(handleError: HandlerError) {
    this.app.use(handleError.handle);
  }
}

export default App;
