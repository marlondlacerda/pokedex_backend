import bcrypt from 'bcryptjs';

import Service from './Service';
import { LoginModel } from '../models/LoginModel';
import { UserLogin } from '../schemas';
import { Authenticator } from '../middlewares';

import createError from '../utils';

class LoginService extends Service<UserLogin> {
  constructor(
    readonly model: LoginModel,
    protected authenticate: Authenticator,
  ) {
    super(model);
  }

  readonly login = async (body: UserLogin): Promise<string> => {
    const { email, password } = body;

    const result = await this.model.findEmail(email);

    if (!result) {
      throw createError('unauthorized', 'Incorrect email or password');
    }
    
    if (!await bcrypt.compare(password, result.password)) {
      throw createError('unauthorized', 'Incorrect email or password');
    }

    const { username } = result;

    return this.authenticate.generateToken({ username });
  };
}

export default LoginService;
