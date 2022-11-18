import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetLogsByEmailRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  perPage: string;
}
