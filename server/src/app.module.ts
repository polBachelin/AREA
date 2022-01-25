import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/nest'), ServicesModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
