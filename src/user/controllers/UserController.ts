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
import { UserService } from '../services';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/ping')
  ping(): string {
    return this.userService.ping();
  }

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() payload: CreateUserRequest) {
    return this.userService.register(payload);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() payload: LoginRequest) {
    return this.userService.login(payload);
  }

  @Post('/logout')
  @UsePipes(ValidationPipe)
  async logout(@Body() payload: LogoutRequest) {
    return this.userService.logout(payload);
  }
}
