import { Controller, Get, Logger, Query, Req, Response, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "./users.service";


@ApiTags('users')
@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService,
                private authService: AuthService
    ) {}

    @Get('/oauth')
    @UseGuards(AuthGuard('jwt'))
    async getloggedService(@Req() req, @Query() query, @Response() res) {
        Logger.log(query, req.user)
        return req.user;
        if (query && query.service)
            return {token: this.usersService.getSpecificService(query.service, req.user.email)};
        else {
            res.body = {token: this.usersService.getAllLoggedService(req.user.email)}
            return res.sendStatus(200);
        }
    }
}