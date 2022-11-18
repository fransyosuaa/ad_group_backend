import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './typeorm';
import { AuthenticationModule } from './authentication';
import { AuditLogModule } from './auditLog';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      database: process.env.MYSQL_DB_NAME,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      // synchronize: true,
      entities,
    }),
    AuthenticationModule,
    AuditLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
