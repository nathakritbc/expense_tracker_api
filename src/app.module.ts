import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { LoggerModule } from 'nestjs-pino';
import { configModule } from './configs/app.config';
import { httpConfig } from './configs/http.config';
import { loggerConfig } from './configs/logger.config';
import { typeormRootConfig } from './configs/typeorm.config';
import { DatabaseModule } from './databases/database.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ClsModule.forRoot(typeormRootConfig),
    ConfigModule.forRoot(configModule),
    HttpModule.register(httpConfig),
    LoggerModule.forRoot(loggerConfig),
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
