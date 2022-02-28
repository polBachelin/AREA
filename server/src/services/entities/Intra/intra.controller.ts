import { Controller, Post, Req, Query, Body, HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { IntraTokenDTO } from 'src/auth/api.payload.dto';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { LinkDTO } from './intra.dto';
import { IntraService } from './intra.service';

@ApiTags('Intra Epitech')
@Controller('intra')
export class IntraController {
    constructor(
        private intraService: IntraService,
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Post('token')
    @ApiOperation({summary: 'Post the intra\'s access token for request'})
    @ApiBody({type: IntraTokenDTO, description: "Your intra autologin, get one at https://intra.epitech.eu/admin/autolog", examples:
    {
        a: {
            summary: "Custom",
            value: { link:"" } as IntraTokenDTO
        }
    }})
    async intraPostToken(@Query() query, @Req() req, @Body() linkDTO: LinkDTO) {
        let info = {email: '', autologin: "", gpa:0};
        let data = await this.intraService.getUserProfile(linkDTO.link)
        if (!data) {
            return new HttpException('Invalid autologin', HttpStatus.BAD_REQUEST);
        }
        info.email = data.login;
        info.autologin = linkDTO.link;
        info.gpa = data.gpa[0].gpa;
        if (query.state) {
            let res = this.authService.verify(query.state);
            this.intraService.setIntraLink(res.email, info);
            return {email: res.email, intra:info.autologin};
        } else
            return await this.intraService.LoginWithIntra(data.login, info);

    }

    @Post('change_gpa')
    async changeGPA(@Req() req, @Query() query) {
        if (!query.email)
            return;
        const user = await this.userService.findOne(query.email);
        if (query.gpa) {
            user.intra.gpa = query.gpa;
            user.save();
        }
    }
}