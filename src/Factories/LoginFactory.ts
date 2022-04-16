import { Router } from 'express';
import { LoginValidation } from '../validations';
import { LoginController } from '../controllers';
import { LoginRouter } from '../routes';
import { Authenticator } from '../middlewares';
import { LoginService } from '../services';
import { LoginModel } from '../models';

class LoginFactory {
  public static createLoginRouter(): Router {
    const loginValidation = new LoginValidation();
    const authenticator = new Authenticator();
    const loginModel = new LoginModel();
    const loginService = new LoginService(loginModel, authenticator);
    const loginController = new LoginController(loginService);
    const loginRouter = new LoginRouter();
    loginRouter.addRoute(loginController, loginValidation);
    return loginRouter.router;
  }
}

export default LoginFactory;
