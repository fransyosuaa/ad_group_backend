import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { User, UserLog } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserLog]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthenticationModule {}
