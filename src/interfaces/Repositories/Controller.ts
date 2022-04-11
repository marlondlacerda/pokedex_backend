import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createError from '../../utils';
import Service from './Services';

abstract class Controller<T> {
  abstract route: string;

  constructor(
    protected service: Service<T>,
  ) { }

  abstract create(
    req: Request<T>,
    res: Response<string>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response,
  ): Promise<Response> => {
    const objs = await this.service.read();

    if (!objs) {
      throw createError(
        'internal',
        'Oops! Something went wrong on our server. Please try again later.',
      );
    }

    return res.status(StatusCodes.OK).json(objs);
  };
}

export default Controller;
