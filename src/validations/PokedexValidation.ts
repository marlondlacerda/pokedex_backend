import { NextFunction, Request, Response } from 'express';
import { pokedexSchema as ZodSchema } from '../schemas/PokedexSchema';

export type AnyRequest = Request<unknown, unknown, unknown, unknown>;

class PokedexValidation {
  private schema = ZodSchema;

  public bodyPokedex = async (
    req: Request<unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    this.schema.parse(req.body);
    next();
  };
}

export default PokedexValidation;
