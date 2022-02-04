import { Controller, Get, Redirect, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DiscordService } from "./discord.service";

@ApiTags('discord')
@Controller('/discord')
export class DiscordController {
	constructor(private discordService: DiscordService) {}

	@Get('/auth')
	@ApiOperation({summary: "Get the access from the authorization"})
	@Redirect('http://localhost:8080')
	discordCallback(@Query() query) {
		this.discordService.authorize(query.code).then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		})
	}
}