import { Controller, Get, Param, Header, Post, Request, Body, Query } from '@nestjs/common';
import { Public } from 'src/custom.decorators';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from 'src/users/register.dto';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDTO } from './login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginApiDTO } from './api.payload.dto';
import { AxiosResponse } from 'axios';
import { Observable, tap, map} from 'rxjs';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
	constructor(private authService: AuthService, private userService: UsersService) {}

    @Post('/login')
    @ApiOperation({ summary: 'Login to the server'})
    @ApiBody({type: LoginApiDTO, description: "Your credential", examples:
    {
        a: {
            summary: "Credential exemple",
            value: { email: "toto@gmail.com", password: "toto123"} as LoginApiDTO
        },
        b: {
            summary: "Custom",
            value: { email: "", password: ""} as LoginApiDTO
        }
    }})
    async login(@Body() UserDTO: LoginDTO) {
        const user = await this.userService.findByLogin(UserDTO)
        const token = await this.authService.signUser(user);
        return { user, token };
    }

    @Get('/profile')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Get the current user'})
    getCurrentUser(@Request() req) {
        return req.user;
    }

    @Post('/register')
    @ApiOperation({ summary: 'Register to the server'})
        @ApiBody({type: LoginApiDTO, description: "Your credential", examples:
    {
        a: {
            summary: "Credential exemple",
            value: { email: "toto@gmail.com", password: "toto123"} as LoginApiDTO
        },
        b: {
            summary: "Custom",
            value: { email: "", password: ""} as LoginApiDTO
        }
    }})
    async register(@Body() RegisterDTO: RegisterDTO) {
        const user = await this.userService.createUser(RegisterDTO);
        const token = await this.authService.signUser(user);
        return { user, token };
    }

    @Get('/notion_callback')
    @ApiOperation({ summary: "Get the access token from the authorization code"})
    notionCallback(@Query() query) {
        console.log("sending notion code");
        const response = this.authService.sendNotionCode(query);
        
        //     response.then((res) => {
    //         res.pipe(tap((resp) => console.log(resp)),map((resp) => resp.data),tap((data) => console.log(data)));
    //     }).catch(res => {
    //         console.log("got error" + res);
    //     })
    }
}
