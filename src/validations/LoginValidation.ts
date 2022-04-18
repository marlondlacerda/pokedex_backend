import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { UserLoginSchema as ZodSchema } from '../schemas/UserLoginSchema';

class LoginValidation {
  private schema = ZodSchema;

  readonly bodyLogin = async (
    req: Request<unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      this.schema.parse(req.body);

      next();
    } catch (err: unknown) {
      /* istanbul ignore next */
      if (err instanceof ZodError) {
        const { message } = err.issues[0];

        return res.status(StatusCodes.BAD_REQUEST).json({ error: message });
      }
    }
  };
}

export default LoginValidation;
