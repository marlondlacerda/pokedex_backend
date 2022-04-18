import { NextFunction, Request, Response } from 'express';
import { pokedexWithIDAndSchema,
  partialPokedexSchema,
} from '../schemas/PokedexSchema';

class PokedexValidation {
  private fullSchema = pokedexWithIDAndSchema;

  private partialSchema = partialPokedexSchema;

  readonly bodyPokedexFull = async (
    req: Request<unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    this.fullSchema.parse(req.body);
    next();
  };

  readonly bodyPokedexPartial = async (
    req: Request<unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    this.partialSchema.parse(req.body);
    next();
  };
}

export default PokedexValidation;
