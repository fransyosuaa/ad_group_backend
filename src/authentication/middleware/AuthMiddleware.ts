import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const tokenKey = process.env.TOKEN_KEY;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }
    try {
      jwt.verify(token, tokenKey);
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
    return next();
  }
}
