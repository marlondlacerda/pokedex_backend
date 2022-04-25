import { Router } from 'express';
import { Controller } from '../controllers';
import { Authenticator, Validation } from '../middlewares';
import { partialPokedexSchema, pokedexWithIDAndSchema } from '../schemas';

class PokedexRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  // eslint-disable-next-line max-lines-per-function
  public addRoute(
    controller: Controller<T>,
    validation: Validation,
    authenticator: Authenticator,
    route: string = controller.route,
  ) {
    this.router.post(
      route, 
      authenticator.verify,
      validation.body(pokedexWithIDAndSchema), 
      controller.create,
    );

    this.router.get(route, controller.read);

    this.router.get(`${route}/:id`, controller.readOne);

    this.router.put(
      `${route}/:id`,
      authenticator.verify,
      validation.body(pokedexWithIDAndSchema),
      controller.update,
    );

    this.router.patch(
      `${route}/:id`,
      authenticator.verify,
      validation.body(partialPokedexSchema),
      controller.partialUpdate,
    );

    this.router.delete(
      `${route}/:id`,
      authenticator.verify,
      controller.delete,
    );
  }
}

export default PokedexRouter;
