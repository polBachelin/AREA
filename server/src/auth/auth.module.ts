import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constant';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule,
  PassportModule,
  JwtModule.register({
    secret: jwtSecret.secret,
    signOptions: { expiresIn: '3000000000s'},
  }), HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,],
  // {
  //   provide: APP_GUARD,
  //   useClass: JwtAuthGuard,
  // }],
  exports: [AuthService]
})

export class AuthModule {}
