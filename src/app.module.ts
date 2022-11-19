import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './typeorm';
import { AuthenticationModule } from './authentication';
import { AuditLogModule } from './auditLog';
import { IpLabelModule } from './ipLabel';
import { AuthMiddleware } from './authentication/middleware/AuthMiddleware';
import { AuditLogController } from './auditLog/controllers';
import { IpLabelController } from './ipLabel/controllers';

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
    IpLabelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '(.*)ping', method: RequestMethod.GET })
      .forRoutes(AuditLogController, IpLabelController);
  }
}
