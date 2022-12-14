import { Controller, Get, Query, Redirect, Req, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { query } from "express";
import { AuthService } from "src/auth/auth.service";
import { GoogleCalendarService } from "./googleCalendar.service";
import { CreateEvent } from "./reactions/CreateEvent";

@ApiTags('google')
@Controller('/googleCalendar')
export class GoogleCalendarController {
	constructor(private googleService: GoogleCalendarService,
				private authService: AuthService) {}
	
	@Get('/auth')
	@ApiOperation({summary: "Get the access token from google"})
	@Redirect('http://localhost:8081/#/home')
	async googleCalendarCallback(@Query() query, @Req() req) {
		let email: string = null;
		let token = null;

		await this.googleService.authorize(query.code).then(res  => {
			token = res;
		});
		if (token) {
			email = await this.googleService.getUserEmail(token);
		}
		if (query.state) {
			let res = this.authService.verify(query.state);
			this.googleService.setToken(res.email, token);
			return {google: token};
		}
		return await this.googleService.loginByGoogleCalendar(email, token);
	}
	
	@Get('/auth_mobile')
	@ApiOperation({summary: "Get the access token from google"})
	async googleCalendarCallbackMobile(@Query() query, @Req() req) {
		let email: string = null;
		let token = null;

		await this.googleService.authorize(query.code).then(res  => {
			token = res;
		});
		if (token) {
			email = await this.googleService.getUserEmail(token);
		}
		if (query.state) {
			let res = this.authService.verify(query.state);
			this.googleService.setToken(res.email, token);
			return {google: token};
		}
		return await this.googleService.loginByGoogleCalendar(email, token);
	}

	@Get('/createEvent')
	async createGoogleEvent() {
		const props: Map<string, any> = new Map<string, any>([
			["calendar_id", "gomh0bmtd1hjt1hnd9u80tvscc@group.calendar.google.com"],
			["event", {"summary": "Test event", "start": {dateTime: new Date(), timeZone:"Asia/Kolkata"}, "end": {dateTime: new Date(), timeZone: "Asia/Kolkata"}}]
		])
		const instance = new CreateEvent("test", props);
		const user = {
			"google": {
				"access_token": "ENQA24pSwtjwLzCXE6C2LdwepKKxKq8F4YsUTPzw4Fo_C5xYiXKuL8MK6h94BOYukW2D1w666_tPrR0v33FS6yt"
			}
		};
		instance.run(user).then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err);
		})
	}

	@Get('/listCalendars')
	@ApiOperation({summary: "Get all calendars from user"})
	@UseGuards(AuthGuard('jwt'))
	async listCalendars(@Request() req) {
		return this.googleService.listCalendars(req.user.email);
	}
}