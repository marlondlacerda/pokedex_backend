/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

class Validation {
  readonly body = (schema: ZodSchema) => async (
    req: Request<unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      schema.parse(req.body);

      next();
    } catch (err: unknown) {
      /* istanbul ignore next */
      if (err instanceof ZodError) {
        const { message } = err.issues[0];

        return res.status(400).json({ error: message });
      }
    }
  };
}

export default Validation;
