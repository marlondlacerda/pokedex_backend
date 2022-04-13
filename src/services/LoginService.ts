import { LoginModel } from '../models/LoginModel';
import { UserLogin } from '../schemas';
import Service from './Service';

class LoginService extends Service<UserLogin> {
  constructor(
    public model = new LoginModel(),
  ) {
    super(model);
  }

  public read = async (): Promise<UserLogin> => {
    const result = await this.model.read();

    return result as unknown as UserLogin;
  };
}

export default LoginService;
