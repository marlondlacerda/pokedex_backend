import { Request, Response } from 'express';
import { UserLogin } from '../schemas';
import { LoginService } from '../services';
import Controller from './Controller';

class LoginController extends Controller<UserLogin> {
  private $route: string;

  constructor(
    readonly service: LoginService,
    route = '/login',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  public handle = async (
    req: Request<UserLogin>,
    res: Response,
  ): Promise<Response> => {
    const { body } = req;

    const result = await this.service.login(body);

    return res.status(200).json({ token: result });
  };
}

export default LoginController;
