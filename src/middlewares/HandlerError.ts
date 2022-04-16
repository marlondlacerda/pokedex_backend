import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ErrorMap {
  [key: string]: number;
}
const errorMap: ErrorMap = {
  badRequest: StatusCodes.BAD_REQUEST,
  unauthorized: StatusCodes.UNAUTHORIZED,
  notFound: StatusCodes.NOT_FOUND,
  unprocessableEntity: StatusCodes.UNPROCESSABLE_ENTITY,
  internal: StatusCodes.INTERNAL_SERVER_ERROR,
};

class HandlerError {
  private status: number | undefined;

  public handle(
    err: Error,
    req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    // Error with library jsonwebtoken
    if (err.name.includes('JsonWebTokenError')) {
      return res
        .status(401)
        .json({ error: 'Invalid token' });
    }

    // Error with library moongose
    if (err.message.includes('duplicate key')) {
      return res
        .status(400)
        .json({ error: 'Duplicate _id' });
    }

    /* istanbul ignore next */
    this.status = errorMap[err.name];
    /* istanbul ignore next */
    if (!this.status) return next(err);
    /* istanbul ignore next */
    res.status(this.status).json({ error: err.message });
  }
}

export default HandlerError;
