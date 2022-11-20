import {
  CreateUserRequest,
  LoginRequest,
  LogoutRequest,
} from 'src/authentication/requests';
import { AuthService } from 'src/authentication/services';
import { AuthController } from '../AuthController';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let payload: any;
  beforeAll(() => {
    service = new AuthService(null, null);
    controller = new AuthController(service);
  });
  describe('ping', () => {
    it('should call service.ping', () => {
      service.ping = jest.fn();
      controller.ping();
      expect(service.ping).toHaveBeenCalled();
    });
  });
  describe('register', () => {
    it('should call service.register', async () => {
      payload = new CreateUserRequest();
      service.register = jest.fn();
      await controller.register(payload);
      expect(service.register).toHaveBeenCalled();
    });
  });
  describe('login', () => {
    it('should call service.login', async () => {
      payload = new LoginRequest();
      service.login = jest.fn();
      await controller.login(payload);
      expect(service.login).toHaveBeenCalled();
    });
  });
  describe('logout', () => {
    it('should call service.logout', async () => {
      payload = new LogoutRequest();
      service.logout = jest.fn();
      await controller.logout(payload);
      expect(service.logout).toHaveBeenCalled();
    });
  });
});
