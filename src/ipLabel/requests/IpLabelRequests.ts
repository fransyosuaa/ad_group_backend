import {
  IsEmail,
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateIpLabel {
  @IsNotEmpty()
  @IsIP()
  ipAddress: string;

  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateIpLabel extends CreateIpLabel {}

export class CreateIpLabelLogRequest {
  @IsNotEmpty()
  @IsIP()
  ipAddress: string;

  oldLabel: string;

  @IsNotEmpty()
  newLabel: string;

  @IsNotEmpty()
  createdBy: string;
}

export class GetIPLabelsPaginationRequest {
  @IsOptional()
  @IsIP()
  ipAddress: string;

  @IsOptional()
  @IsString()
  label: string;

  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  perPage: string;
}
