import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { LoggerMiddleware } from './shared/midldleware/logger.midleware';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   
    }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    AuthModule,
    UsersModule,
    ItemModule,
  ],
  

  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
