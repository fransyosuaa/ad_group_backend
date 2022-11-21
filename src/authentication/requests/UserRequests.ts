import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ActionLogType, UserType } from '../enums';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @IsOptional()
  @IsString()
  type: UserType;
}

export class LoginRequest extends CreateUserRequest {}

export class LogoutRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateUserLogRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  action: ActionLogType;
}
