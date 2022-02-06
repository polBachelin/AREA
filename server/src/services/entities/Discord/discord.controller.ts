import { Controller, Get, Redirect, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DiscordService } from "./discord.service";

@ApiTags('discord')
@Controller('/discord')
export class DiscordController {
	constructor(private discordService: DiscordService) {}

	@Get('/auth')
	@ApiOperation({summary: "Get the access from the authorization"})
	discordCallback(@Query() query) {
		this.discordService.authorize(query.code).then((res) => {
			let token = res.data.json();
			console.log(res.data.json());
		}).catch((err) => {
			console.log(err.response);
			console.log(err.response.data.errors.redirect_uri._errors)
		})
	}

	@Get('/token')
	discordTokenResponse(@Query() query) {
		console.log(query);
	}
}