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
    _req: Request,
    res: Response, 
    next: NextFunction,
  ) {
    // Errors with library moongose
    if (err.message.includes('duplicate key')) {
      return res.status(400).json({ error: 'Duplicate _id' });
    }

    if (err.message.includes('immutable field \'_id\'')) {
      return res.status(400).json({ error: '_id is immutable' });
    }

    this.status = errorMap[err.name];
    /* istanbul ignore if */
    if (!this.status) return next(err);

    res.status(this.status).json({ error: err.message });
  }
}

export default HandlerError;
