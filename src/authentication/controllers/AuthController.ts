import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserRequest, LoginRequest } from '../requests';
import { LogoutRequest } from '../requests/UserRequests';
import { AuthService } from '../services';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/ping')
  ping(): string {
    return this.authService.ping();
  }

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() payload: CreateUserRequest) {
    return this.authService.register(payload);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() payload: LoginRequest) {
    return this.authService.login(payload);
  }

  @Post('/logout')
  @UsePipes(ValidationPipe)
  async logout(@Body() payload: LogoutRequest) {
    return this.authService.logout(payload);
  }
}
