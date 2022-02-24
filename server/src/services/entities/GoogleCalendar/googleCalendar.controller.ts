import { Controller, Get, Query, Req } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { query } from "express";
import { AuthService } from "src/auth/auth.service";
import { GoogleCalendarService } from "./googleCalendar.service";

@ApiTags('google')
@Controller('/googleCalendar')
export class GoogleCalendarController {
	constructor(private googleService: GoogleCalendarService,
				private authService: AuthService) {}
	
	@Get('/auth')
	@ApiOperation({summary: "Get the access token from google"})
	async googleCalendarCallback(@Query() query, @Req() req) {
		this.googleService.authorize(query.code);
	}
}