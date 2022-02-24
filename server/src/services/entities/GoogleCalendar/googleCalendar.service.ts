import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { google } from 'googleapis'
import { Model } from 'mongoose'
import { RegisterDTO } from "src/users/register.dto";
import { AuthService } from "src/auth/auth.service";
import { InjectModel } from "@nestjs/mongoose";
import { IOauthToken } from "src/models/OauthToken";
import { OAuth2Client } from 'google-auth-library';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly',
				'https://www.googleapis.com/auth/calendar.app.created',
				'https://www.googleapis.com/auth/calendar.calendarlist.readonly',
				'https://www.googleapis.com/auth/calendar',
				'https://www.googleapis.com/auth/calendar.events',
				'https://www.googleapis.com/auth/calendar.events.owned'];

const CLIENT_ID = "338854183277-1u6esadfcuu84km6jvh9pd1adnq6vc9g.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "http://localhost:3000/googleCalendar/auth";

@Injectable()
export class GoogleCalendarService {
	
	private oAuth2Client: OAuth2Client;

	constructor(private userService: UsersService, private authService: AuthService, 
		@InjectModel('Google') private googleModel: Model<IOauthToken>) {
		this.oAuth2Client = new google.auth.OAuth2(
			CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
		)
  	}
	
	public authorize(code) {
		this.oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error retrieving access token', err);
			return new Promise<any>((res, rej) => {
				res(token);
			})
		});
	}

	public async loginByGoogleCalendar(email: string, token: string) {
		if (email) {
			let user = await this.userService.findOne(email);
			if (!user) {
				let registerDTO: RegisterDTO
				registerDTO = {email: email, password: ''};
				user = await this.userService.createUser(registerDTO);
			}
			this.setToken(email, token);
			const t = await this.authService.signUser(user);
			console.log(t);
		}
	}

	public setToken(email: string, token: Object) {
		this.userService.findOne(email).then(res => {
			const userGoogle = new this.googleModel(token);
			res.google = userGoogle;
			res.save();
			return this.userService.sanitizeUser(res);
		})
	}

	public listEvents(auth) {
		const calendar = google.calendar({version: 'v3', auth});
		calendar.events.list({
			calendarId: 'primary',
			timeMin: (new Date()).toISOString(),
			maxResults: 10,
			singleEvents: true,
			orderBy: 'startTime',
		}, (err, res) => {
			if (err) return console.log('The API returned an error: ' + err);
			const events = res.data.items;
			if (events.length) {
				console.log('Upcoming 10 events:');
				events.map((event, i) => {
					const start = event.start.dateTime || event.start.date;
					console.log(`${start} - ${event.summary}`);
				});
			} else {
			console.log('No upcoming events found.');
			}
		});
	}
}