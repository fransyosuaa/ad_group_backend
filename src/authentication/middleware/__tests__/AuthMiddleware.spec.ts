import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import { AuthMiddleware } from '../AuthMiddleware';

jest.mock('jsonwebtoken');
describe('AuthMiddleware', () => {
  let controller: AuthMiddleware;
  let req: any, res: any;
  let next: jest.Mocked<NextFunction>;
  const mockJwt = jwt as jest.Mocked<typeof jwt>;
  beforeAll(() => {
    mockJwt.verify = jest.fn();
    controller = new AuthMiddleware();
    res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
    };
    req = {
      body: {},
      query: {},
      headers: {},
    };
    next = jest.fn() as jest.Mocked<NextFunction>;
  });
  describe('use', () => {
    it('should return status 403 when no token is supplied', () => {
      controller.use(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.status().send).toHaveBeenCalledWith(
        'A token is required for authentication',
      );
    });
    it('should return status 401 when token is invalid', () => {
      req.body = {
        token: 'sometoken',
      };
      mockJwt.verify = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      controller.use(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.status().send).toHaveBeenCalledWith('Invalid Token');
    });
    it('should return call next() when token is verified', () => {
      mockJwt.verify = jest.fn().mockImplementation(() => 'ok');
      controller.use(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
