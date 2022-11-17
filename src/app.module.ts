import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'remotemysql.com',
      port: 3306,
      username: 'qZTQtkMXrJ',
      password: '7YELpJXizu',
      database: 'qZTQtkMXrJ',
      // synchronize: true,
      entities,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
