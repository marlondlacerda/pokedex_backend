import { NextFunction, Request, Response } from 'express';
import { UserLoginSchema as ZodSchema } from '../schemas/UserLoginSchema';

class LoginValidation {
  private schema = ZodSchema;

  readonly bodyLogin = async (
    req: Request<unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    this.schema.parse(req.body);
    next();
  };
}

export default LoginValidation;
