import { Router } from 'express';
import { Validation } from '../middlewares';
import { UserLoginSchema } from '../schemas';
import { LoginController } from '../controllers';

class LoginRouter {
  readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: LoginController,
    validation: Validation,
    route: string = controller.route,
  ) {
    this.router.post(
      route,
      validation.body(UserLoginSchema), 
      controller.handle,
    );
  }
}

export default LoginRouter;
