import express from 'express';
import Connection from './models/config';
// import routes from './routes';

class App {
  public express: express.Application;

  public connection: Promise<typeof import('mongoose')>;

  constructor() {
    this.express = express();
    this.middlewares();
    this.connection = Connection();
    // this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  // private routes() {
  //   // this.express.use(routes);
  // }
}

export default App;
