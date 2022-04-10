import express, { Router } from 'express';
import Connection from './models/config';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
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
}

export default App;
