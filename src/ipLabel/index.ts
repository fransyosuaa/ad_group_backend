import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpLabelController } from './controllers';
import { IpLabelService } from './services';
import { IpLabelLog, IpLabel } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([IpLabelLog]),
    TypeOrmModule.forFeature([IpLabel]),
  ],
  controllers: [IpLabelController],
  providers: [IpLabelService],
  exports: [],
})
export class IpLabelModule {}
