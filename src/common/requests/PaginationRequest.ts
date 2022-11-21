import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginationRequest {
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  perPage: number;
}
