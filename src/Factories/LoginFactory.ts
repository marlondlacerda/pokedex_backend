import { Router } from 'express';
import { LoginValidation } from '../validations';
import { LoginController } from '../controllers';
import { LoginRouter } from '../routes';
import { UserLogin } from '../schemas';

class LoginFactory {
  public static creatLoginRouter(): Router {
    const loginValidation = new LoginValidation();
    const loginController = new LoginController();
    const loginRouter = new LoginRouter<UserLogin>();
    loginRouter.addRoute(loginController, loginValidation);
    return loginRouter.router;
  }
}

export default LoginFactory;
