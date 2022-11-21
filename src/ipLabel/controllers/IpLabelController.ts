import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateIpLabel,
  GetIPLabelsPaginationRequest,
  UpdateIpLabel,
} from '../requests/IpLabelRequests';
import { IpLabelService } from '../services';

@Controller('/ip-label')
export class IpLabelController {
  constructor(private readonly ipService: IpLabelService) {}

  @Get('/')
  @UsePipes(ValidationPipe)
  async getIpLabels(@Query() filter: GetIPLabelsPaginationRequest) {
    return this.ipService.getIpLabels(filter);
  }

  @Get('/ping')
  ping(): string {
    return this.ipService.ping();
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  async getIpLabelById(@Param('id') id: string) {
    return this.ipService.getIpLabelById(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async create(@Body() payload: CreateIpLabel) {
    return this.ipService.create(payload);
  }

  @Put('/')
  @UsePipes(ValidationPipe)
  async update(@Body() payload: UpdateIpLabel) {
    return this.ipService.update(payload);
  }
}
