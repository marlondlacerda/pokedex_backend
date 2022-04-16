import bcrypt from 'bcryptjs';

import createError from '../utils';
import { LoginModel } from '../models/LoginModel';
import { UserLogin } from '../schemas';
import Service from './Service';
import { Authenticator } from '../middlewares';

class LoginService extends Service<UserLogin> {
  constructor(
    readonly model = new LoginModel(),
    protected authenticate = new Authenticator(),
  ) {
    super(model);
  }

  readonly login = async (body: UserLogin): Promise<string> => {
    const { email, password } = body;

    const result = await this.model.readOne(email);

    if (!result) {
      throw createError('unauthorized', 'Incorrect email or password');
    }
    
    if (!await bcrypt.compare(password, result.password)) {
      throw createError('unauthorized', 'Incorrect email or password');
    }

    const { username } = result;

    const token = this.authenticate.generateToken({ username });

    return token;
  };
}

export default LoginService;
