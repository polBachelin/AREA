import { Controller, Get, Redirect, Query, Logger } from "@nestjs/common";
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
	@Redirect('http://localhost:8080')
	async discordCallback(@Query() query) {
		let email: string = null;
		let discordToken = null;
		await this.discordService.authorize(query.code).then((res) => {
			discordToken = res;
		})
		if (discordToken) {
			email = await this.discordService.getUserEmail(discordToken.access_token)
		}
		if (email) {
			let user = await this.userService.findOne(email);			
			if (!user) {
				let RegisterDTO: RegisterDTO;
				RegisterDTO = {email:email, password:''};
				user = await this.userService.createUser(RegisterDTO);				
			}
			this.discordService.setDiscordToken(email, discordToken);			
			const token = await this.authService.signUser(user);
			return { url: 'http://localhost:8080/home?email=' + email + '&token=' + token.access_token};
		}
	}
}