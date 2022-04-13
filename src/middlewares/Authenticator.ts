import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import createError from '../utils';

require('dotenv/config');

const { SECRET } = process.env;

// Source: https://stackoverflow.com/a/55718334
declare module 'express-serve-static-core' {
  interface Request {
    userName?: string
  }
}

export interface Payload {
  username: string | undefined
}

class Authenticator {
  private secret: string;

  constructor() {
    if (!SECRET) {
      throw createError('internal', 'SECRET is not defined');
    }

    this.secret = SECRET;
  }

  readonly generateToken = (payload: Payload) => sign(payload, this.secret, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });

  private verifyToken = (token: string): JwtPayload => 
    verify(token, this.secret, { algorithms: ['HS256'] }) as JwtPayload;

  readonly authMiddleware = async (
    req: Request<unknown>, 
    res: Response,
    next: NextFunction,
  ) => {
    const { authorization } = req.headers;

    if (!authorization) throw createError('unauthorized', 'No token provided');

    const { userName } = this.verifyToken(authorization);

    req.userName = userName;

    return next();
  };
}

export default Authenticator;
