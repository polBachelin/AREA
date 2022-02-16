import { Controller, Get, Logger, Query, UseGuards, Request, Response, Redirect, Param } from "@nestjs/common";
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
	constructor(private notionService: NotionService,
				private authService: AuthService,
				private userService: UsersService) {}

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
			let user = await this.userService.findOne(email);
			Logger.log(user)
			if (!user) {
				Logger.log("We gonna create a user")
				let RegisterDTO: RegisterDTO;
				RegisterDTO = {email:email, password: ''};
				user = await this.userService.createUser(RegisterDTO);
			}
			Logger.log("Set token")
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

	@ApiOperation({summary: 'Retrieve notion user databases titles'})
	@Get('/databases/title')
	@UseGuards(AuthGuard('jwt'))
	async getNotionDatabaseTitle(@Request() req) {
		return this.notionService.getAllDatabaseTitles(req.user.email)
	}

	//TODO add db id getter from db title
}