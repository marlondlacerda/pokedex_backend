import { Router } from 'express';
import { LoginValidation } from '../validations';
import { LoginController } from '../controllers';
import { LoginRouter } from '../routes';

class LoginFactory {
  public static createLoginRouter(): Router {
    const loginValidation = new LoginValidation();
    const loginController = new LoginController();
    const loginRouter = new LoginRouter();
    loginRouter.addRoute(loginController, loginValidation);
    return loginRouter.router;
  }
}

export default LoginFactory;
