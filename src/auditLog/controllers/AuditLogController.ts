import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetIpLogsById, GetLogsByEmailRequest } from '../requests';
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
  async getUserLogs(@Query() query: GetLogsByEmailRequest) {
    return this.logService.getUserLogs(query);
  }

  @Get('/ip-label')
  @UsePipes(ValidationPipe)
  async getIpLabelLogs(@Query() query: GetIpLogsById) {
    return this.logService.getIpLabelLogs(query);
  }
}
