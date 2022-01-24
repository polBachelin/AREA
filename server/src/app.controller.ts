import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './custom.decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService : AuthService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }
}
