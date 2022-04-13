import { Router } from 'express';
import { LoginValidation } from '../validations';
import { LoginController } from '../controllers';

class LoginRouter {
  readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: LoginController,
    validation: LoginValidation,
    route: string = controller.route,
  ) {
    this.router.post(route, validation.bodyLogin, controller.handle);
  }
}

export default LoginRouter;
