import { Router } from 'express';
import { PokedexValidation } from '../validations';
import { Controller } from '../controllers';
import { Authenticator } from '../middlewares';

class PokedexRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    validation: PokedexValidation,
    authenticator: Authenticator,
    route: string = controller.route,
  ) {
    this.router.post(
      route, 
      authenticator.authMiddleware,
      validation.bodyPokedex, 
      controller.create,
    );

    this.router.get(route, controller.read);

    this.router.put(
      `${route}/:id`,
      authenticator.authMiddleware,
      validation.bodyPokedex,
      controller.update,
    );
  }
}

export default PokedexRouter;
