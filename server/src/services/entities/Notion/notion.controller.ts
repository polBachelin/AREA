import { Controller, Get, Query } from "@nestjs/common";
import { NotionService } from "./notion.service";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('notion')
@Controller('/notion')
export class NotionController {
	constructor(private notionService: NotionService) {}

	@Get('/auth')
	@ApiOperation({ summary: "Get the access token from the authorization code"})
    notionCallback(@Query() query) {
		let token = this.notionService.authorize(query.code);
		//TODO Killian save the token to DB
	}
	
}