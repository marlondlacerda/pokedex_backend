import express, { Router } from 'express';
import 'express-async-errors';

import { HandlerError } from './middlewares';
import Connection from './models/config';

require('dotenv/config');

const { PORT } = process.env;

class App {
  readonly app: express.Application;

  private connection: Promise<typeof import('mongoose')>;

  constructor() {
    this.app = express();
    this.config();
    this.connection = Connection();
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

  /* istanbul ignore next */
  public startServer(port = 3001) {
    const actualPort = PORT || port;

    return this.app.listen(
      actualPort,
      () => console.log('Estamos online na porta: ', actualPort),
    );
  }

  public addRouter(router: Router) {
    this.app.use(express.json());
    this.app.use(router);
  }

  public errorRouter(
    handleError: HandlerError,
  ) {
    this.app.use(handleError.handle);
  }
}

export default App;
