import { Router } from 'express';
import PokedexValidation from '../validations';
import { Controller } from '../controllers';
import { Authenticator } from '../middlewares';

class CustomRouter<T> {
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
    this.router.get(route, controller.read);

    this.router.post(
      route, 
      authenticator.authMiddleware,
      validation.bodyPokedex, 
      controller.create,
    );
  }
}

export default CustomRouter;
