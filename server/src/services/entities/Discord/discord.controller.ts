import { Controller, Get, Redirect, Query, Logger, Req, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";
import { DiscordService, DiscordOauthToken } from "./discord.service";
import { AddRoleToChannel } from "./reactions/AddRoleToChannel";
import { RemoveRoleFromChannel } from "./reactions/RemoveRoleFromChannel";
import { SendMessage } from "./reactions/SendMessage";

@ApiTags('discord')
@Controller('/discord')
export class DiscordController {
	constructor(private discordService: DiscordService,
				private authService: AuthService,
				private userService: UsersService) {}

	@Get('/auth')
	@ApiOperation({summary: "Get the access from the authorization"})
	@Redirect('http://localhost:8080')
	async discordCallback(@Query() query, @Req() req) {
		let email: string = null;
		let discordToken = null;

		await this.discordService.authorize(query.code).then((res) => {
			discordToken = res;
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

	@Get('/getChannels')
	@ApiOperation({summary: "Get the channels of the bot"})
	@UseGuards(AuthGuard('jwt'))
	async getChannels(@Request() req) {
		let res = await this.discordService.getChannels();
		return res
	}

	@Get('/run')
	async runBotMessage() {
		const props: Map<string, any> = new Map<string, any>([
			["guild_id", "286961972589625344"],
			["role_id", "948618505400492162"]
		]);
		const instance = new RemoveRoleFromChannel("test", props);
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

	@Get('/getRoles')
	@ApiOperation({summary: "Get the roles of servers"})
	@UseGuards(AuthGuard('jwt'))
	async getRoles(@Request() req) {
		let res = await this.discordService.getRoles();
		return res;
	}

	@Get('/auth_mobile')
	@ApiOperation({summary: "Get the access from the authorization"})
	async discordMobileCallback(@Query() query, @Req() req) {
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
}