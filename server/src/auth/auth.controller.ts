import { Controller, Get, Param, Header, Post, Request } from '@nestjs/common';
import { Public } from 'src/custom.decorators';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('/profile')
    getCurrentUser(@Request() req) {
        return req.user;
    }
}
