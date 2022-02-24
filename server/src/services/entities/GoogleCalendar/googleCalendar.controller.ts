import { Controller, Get, Query, Redirect, Req } from "@nestjs/common";
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
	@Redirect('http://localhost:8080')
	async googleCalendarCallback(@Query() query, @Req() req) {
		let email: string = null;
		let token = null;

		await this.googleService.authorize(query.code).then(res  => {
			token = res;
		});
		if (token) {
			console.log("TOKEN == ", token);
			email = await this.googleService.getUserEmail(token);
		}
		return await this.googleService.loginByGoogleCalendar(email, token);
	}
}