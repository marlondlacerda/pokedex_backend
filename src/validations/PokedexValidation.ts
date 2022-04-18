import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
    try {
      this.fullSchema.parse(req.body);

      next();
    } catch (err: any) {
      const { message } = err.issues[0];

      res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    }
  };

  readonly bodyPokedexPartial = async (
    req: Request<unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      this.partialSchema.parse(req.body);

      next();
    } catch (err: any) {
      const { message } = err.issues[0];

      res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    }
  };
}

export default PokedexValidation;
