import { Request, Response } from 'express';
import Service from './Services';

export type ResponseError = {
  error: unknown;
};

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(
    protected service: Service<T>,
  ) { }

  read = async (
    _req: Request,
    res: Response,
  ): Promise<Response> => {
    const objs = await this.service.read();

    return res.status(200).json(objs);
  };
}

export default Controller;
