import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class GetLogsByEmailRequest {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  perPage: string;
}

export class GetIpLogsById {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  perPage: string;
}
