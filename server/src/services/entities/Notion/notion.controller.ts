import { Controller, Get, Logger, Query, UseGuards, Request } from "@nestjs/common";
import { NotionService } from "./notion.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { RegisterDTO } from "src/users/register.dto";

@ApiTags('notion')
@Controller('/notion')
export class NotionController {
	constructor(private notionService: NotionService, private authService: AuthService, private userService: UsersService) {}

	@Get('/auth')
	// @UseGuards(AuthGuard('jwt'))
	@ApiOperation({ summary: "Get the access token from the authorization code"})
    async notionCallback(@Query() query) {
		let email = null;
		let notionToken = null;
		await this.notionService.authorize(query.code).then((res) => {
			email = res.data.owner.user.person.email;
			notionToken = res.data;
		}).catch((err) => {
			console.log(err);
		})
		if (email) {
			const user = await this.userService.findOne(email);
			if (!user) {
				let RegisterDTO: RegisterDTO;
				RegisterDTO = {email:email, password: ''};
				let user = this.userService.createUser(RegisterDTO);
			}
			this.notionService.setNotionToken(email, notionToken);
			const token = await this.authService.signUser(user);
			return { user, token };
		}
	}

	@Get('/token')
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({ summary: 'Retrieve the notion token from the db'})
	async getNotionToken(@Request() req) {
		return this.notionService.getNotionToken(req.user.email);
	}
}