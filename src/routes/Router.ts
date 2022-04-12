import { Router } from 'express';
import PokedexValidation from '../validations';
import { Controller } from '../controllers';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    validation: PokedexValidation,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);

    this.router.post(
      route, 
      validation.bodyPokedex, 
      controller.create,
    );
  }
}

export default CustomRouter;
