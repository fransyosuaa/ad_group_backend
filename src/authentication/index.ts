import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { User, UserLog } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserLog]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthenticationModule {}
