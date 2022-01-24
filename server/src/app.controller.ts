import { Controller, Get, UseGuards, Post, Request} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './custom.decorators';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService, private authService : AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/user/profile')
  getCurrentUser(@Request() req) {
    return req.user;
  }
}
