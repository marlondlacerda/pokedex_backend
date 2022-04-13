import { Request, Response } from 'express';
import { LoginService } from '../services';
import { UserLogin } from '../schemas';
import Controller from './Controller';

class LoginController extends Controller<UserLogin> {
  private $route: string;

  constructor(
    readonly service = new LoginService(),
    route = '/login',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  public handle = async (
    req: Request<UserLogin>,
    res: Response,
  ): Promise<any> => {
    const { body } = req;

    const result = await this.service.login(body);
    console.log(result);
  };
}

export default LoginController;
