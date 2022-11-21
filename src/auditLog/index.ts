import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogController } from './controllers';
import { AuditLogService } from './services';
import { IpLabelLog, UserLog } from 'src/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([IpLabelLog]),
    TypeOrmModule.forFeature([UserLog]),
  ],
  controllers: [AuditLogController],
  providers: [AuditLogService],
  exports: [],
})
export class AuditLogModule {}
