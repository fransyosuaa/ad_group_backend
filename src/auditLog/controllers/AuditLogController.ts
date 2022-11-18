import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetLogsByEmailRequest } from '../requests';
import { AuditLogService } from '../services';

@Controller('/audit-log')
export class AuditLogController {
  constructor(private readonly logService: AuditLogService) {}

  @Get('/ping')
  ping(): string {
    return this.logService.ping();
  }

  @Get('/user')
  @UsePipes(ValidationPipe)
  async register(@Query() query: GetLogsByEmailRequest) {
    return this.logService.getUserLogs(query);
  }
}
