import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from './constant';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret.secret,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    Logger.log("ERROR VALIDATE", payload);
    const user = await this.authService.validateUser(payload.email);
    Logger.log("ERROR VALIDATE");
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,);
    }
    return done(null, user, payload.iat);
  }
}
