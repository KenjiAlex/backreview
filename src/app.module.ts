import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { MongooseConfigService } from './config/MongooseConfigService';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CostsModule } from './costs/costs.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService
    }),
    ConfigModule.forRoot({
      load: [configuration]
    }),
    AuthModule,
    CostsModule
  ]
})
export class AppModule {}
