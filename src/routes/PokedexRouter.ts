import { Router } from 'express';
import { PokedexValidation } from '../validations';
import { Controller } from '../controllers';
import { Authenticator } from '../middlewares';

class PokedexRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  // eslint-disable-next-line max-lines-per-function
  public addRoute(
    controller: Controller<T>,
    validation: PokedexValidation,
    authenticator: Authenticator,
    route: string = controller.route,
  ) {
    this.router.post(
      route, 
      authenticator.authMiddleware,
      validation.bodyPokedexFull, 
      controller.create,
    );

    this.router.get(route, controller.read);

    this.router.put(
      `${route}/:id`,
      authenticator.authMiddleware,
      validation.bodyPokedexFull,
      controller.update,
    );

    this.router.patch(
      `${route}/:id`,
      authenticator.authMiddleware,
      validation.bodyPokedexPartial,
      controller.partialUpdate,
    );
  }
}

export default PokedexRouter;
