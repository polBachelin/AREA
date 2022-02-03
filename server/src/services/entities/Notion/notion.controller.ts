import { Controller, Get, Query } from "@nestjs/common";
import { NotionService } from "./notion.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('notion')
@Controller('/notion')
export class NotionController {
	constructor(private notionService: NotionService) {}

	@Get('/auth')
	@ApiOperation({ summary: "Get the access token from the authorization code"})
    notionCallback(@Query() query) {
		this.notionService.authorize(query.code).then((res) => {
			let email = res.data.owner.user.person.email;
			let token = res.data;
			//TODO CREATE A PHANTOM ACCOUNT WITH NOTION EMAIL AND NULL PASSOWRD
			//TODO login user with that account
			//TODO Killian save the token to DB
		}).catch((err) => {
			console.log(err);
		})
	}
}