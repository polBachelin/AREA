import { Controller, Get, Logger, Query, UseGuards, Request, Response, Redirect } from "@nestjs/common";
import { NotionService } from "./notion.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { RegisterDTO } from "src/users/register.dto";
import { use } from "passport";

//secret_WozMzMwc0e8jQzO1f4vGtytC36YTwVF2eWDdRDpgXez

@ApiTags('notion')
@Controller('/notion')
export class NotionController {
	constructor(private notionService: NotionService, private authService: AuthService, private userService: UsersService) {}

	@Get('/auth')
	@Redirect('http://localhost:8080/home')
	@ApiOperation({ summary: "Get the access token from the authorization code"})
    async notionCallback(@Query() query) {
		let email: string = null;
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
			return { url: 'http://localhost:8080/home?email=' + email + '&token=' + token.access_token};
		}
	}



	@Get('/token')
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({ summary: 'Retrieve the notion token from the db'})
	async getNotionToken(@Request() req) {
		return this.notionService.getNotionToken(req.user.email);
	}

	@ApiOperation({summary: 'Retrieve notion user databases'})
	@Get('/databases')
	@UseGuards(AuthGuard('jwt'))
	async getNotionDatabases(@Request() req) {
		return this.notionService.getDatabases(req.user.email);
	}
}