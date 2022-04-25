import { Router } from 'express';
import { Authenticator, Validation } from '../middlewares';
import { LoginModel } from '../models';
import { LoginService } from '../services';
import { LoginController } from '../controllers';
import { LoginRouter } from '../routes';

class LoginFactory {
  public static createLoginRouter(): Router {
    const validation = new Validation();
    const authenticator = new Authenticator();
    const loginModel = new LoginModel();
    const loginService = new LoginService(loginModel, authenticator);
    const loginController = new LoginController(loginService);
    const loginRouter = new LoginRouter();
    loginRouter.addRoute(loginController, validation);
    return loginRouter.router;
  }
}

export default LoginFactory;
