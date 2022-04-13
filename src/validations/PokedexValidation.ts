import { NextFunction, Request, Response } from 'express';
import { pokedexSchema as ZodSchema } from '../schemas/PokedexSchema';

class PokedexValidation {
  private schema = ZodSchema;

  readonly bodyPokedex = async (
    req: Request<unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    this.schema.parse(req.body);
    next();
  };
}

export default PokedexValidation;
