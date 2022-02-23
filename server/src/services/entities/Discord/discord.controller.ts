import { Controller, Get, Redirect, Query, Logger, Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { RegisterDTO } from "src/users/register.dto";
import { UsersService } from "src/users/users.service";
import { DiscordService, DiscordOauthToken } from "./discord.service";

@ApiTags('discord')
@Controller('/discord')
export class DiscordController {
	constructor(private discordService: DiscordService,
				private authService: AuthService,
				private userService: UsersService) {}

	@Get('/auth')
	@ApiOperation({summary: "Get the access from the authorization"})
	//@Redirect('http://localhost:8080')
	async discordCallback(@Query() query, @Req() req) {
		let email: string = null;
		let discordToken = null;

		await this.discordService.authorize(query.code).then((res) => {
			discordToken = res;
			console.log(discordToken)
		})
		if (discordToken) {
			email = await this.discordService.getUserEmail(discordToken.access_token)
		}
		if (req.headers.authorization) {
			let res = this.authService.verify(req.headers.authorization);
			this.discordService.setDiscordToken(res.email, discordToken)
			return {discord: discordToken};
		} else
			return await this.discordService.LoginByDiscord(email, discordToken);
	}
}