import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

class ZodHandlerError {
  private statusCode: number;

  public zodHandler(
    err: ZodError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err.name !== 'ZodError') return next(err);

    const { message } = err.issues[0];

    this.statusCode = StatusCodes.BAD_REQUEST;

    res.status(this.statusCode).json({ error: message });
  }
}

export default ZodHandlerError;
