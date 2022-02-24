import { Controller, Get, Redirect, Query, Logger, Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { RegisterDTO } from "src/users/register.dto";
import { UsersService } from "src/users/users.service";
import { DiscordService, DiscordOauthToken } from "./discord.service";
import { SendMessage } from "./reactions/SendMessage";

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
		if (query.state) {
			let res = this.authService.verify(query.state);
			this.discordService.setDiscordToken(res.email, discordToken)
			return {discord: discordToken};
		} else
			return await this.discordService.LoginByDiscord(email, discordToken);
	}

	@Get('/run')
	async runBotMessage() {
		const props: Map<string, any> = new Map<string, any>([
			["guild_id", "286961972589625344"],
			["message_content", "Hello sent from AREA"]
		]);
		const instance = new SendMessage("test", props);
		const user = {
			"discord": {
				"access_token": "Mjg2OTU5NTgxNDg4NDgwMjY3.WLiB7w.XApM2voxDIVQ_nHBdhBwRBdEyuc"
			}
		};
		instance.run(user).then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err);
		});
	}
}