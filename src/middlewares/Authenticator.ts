import { JsonWebTokenError, JwtPayload, sign, verify } from 'jsonwebtoken';
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

interface ErrorMap {
  [key: string]: string;
}

const errorMap: ErrorMap = {
  JsonWebTokenError: 'Invalid token',
  TokenExpiredError: 'Token expired',
};

class Authenticator {
  private secret: string;

  constructor() {
    /* istanbul ignore if */
    if (!SECRET) {
      throw new Error('SECRET is not defined');
    }

    this.secret = SECRET;
  }

  readonly generateToken = (payload: Payload) => sign(payload, this.secret, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });

  private verifyToken = (token: string): JwtPayload => 
    verify(token, this.secret, { algorithms: ['HS256'] }) as JwtPayload;

  readonly verify = async (
    req: Request<unknown>,
    _res: Response,
    next: NextFunction,
  ) => {
    const { authorization } = req.headers;

    if (!authorization) throw createError('unauthorized', 'No token provided');

    try {
      const payload = this.verifyToken(authorization);

      req.userName = payload.username;

      next();
    } catch (err: JsonWebTokenError | unknown) {
      /* istanbul ignore next */
      if (err instanceof JsonWebTokenError) {
        throw createError('unauthorized', errorMap[err.name]);
      } 
    }
  };
}

export default Authenticator;
