import { NextFunction, Request, Response } from 'express';

interface ErrorMap {
  [key: string]: number;
}
const errorMap: ErrorMap = {
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  unprocessableEntity: 422,
  internal: 500,
};

class HandlerError {
  private status: number | undefined;

  public handle(
    err: Error,
    req: Request,
    res: Response, 
    _next: NextFunction,
  ): Response {
    this.status = errorMap[err.name];

    if(!this.status) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(this.status).json({ error: err.message });
    _next();
  }
}

export default HandlerError;
