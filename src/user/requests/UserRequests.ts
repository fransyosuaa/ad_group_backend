import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;
}

export class LoginRequest extends CreateUserRequest {}
