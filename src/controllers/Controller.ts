import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createError from '../utils';
import { Service } from '../services';

abstract class Controller<T> {
  abstract route: string;

  constructor(
    readonly service: Service<T>,
  ) {}

  public create = async (
    req: Request<T>,
    res: Response,
  ): Promise<typeof res> => {
    const { body } = req;

    const result = await this.service.create(body);

    return res.status(StatusCodes.CREATED).json(result);
  };

  public read = async (
    _req: Request,
    res: Response,
  ): Promise<Response> => {
    const result = await this.service.read();

    return res.status(StatusCodes.OK).json(result);
  };

  public update = async (
    req: Request,
    res: Response,
  ): Promise<typeof res> => {
    const { params, body } = req;

    const result = await this.service.update(Number(params.id), body);

    if (!result) {
      throw createError(
        'notFound',
        'Oh noes, there\'s nothing in here! Page not found!',
      );
    }

    return res.status(StatusCodes.OK).json(result);
  };
}

export default Controller;
