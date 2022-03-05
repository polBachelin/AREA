import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { google } from 'googleapis'
import { Model } from 'mongoose'
import { RegisterDTO } from "src/users/register.dto";
import { AuthService } from "src/auth/auth.service";
import { InjectModel } from "@nestjs/mongoose";
import { OauthTokenDoc } from "src/models/OauthToken";
import { OAuth2Client, Credentials} from 'google-auth-library';


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly',
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/calendar.app.created',
				'https://www.googleapis.com/auth/calendar.calendarlist.readonly',
				'https://www.googleapis.com/auth/calendar',
				'https://www.googleapis.com/auth/calendar.events',
				'https://www.googleapis.com/auth/calendar.events.owned'];

const REDIRECT_URI = "http://localhost:8080/googleCalendar/auth";

@Injectable()
export class GoogleCalendarService {
	
	private oAuth2Client: OAuth2Client;

	constructor(private userService: UsersService, private authService: AuthService, 
		@InjectModel('Google') private googleModel: Model<OauthTokenDoc>) {
		this.oAuth2Client = new google.auth.OAuth2(
			process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, REDIRECT_URI
		)
  	}
	
	public async authorize(code): Promise<Credentials> {
		let token;
		await this.oAuth2Client.getToken(code).then(res => {
			token = res;
		}).catch(err => {
			return console.error('Error retrieving access token', err);
		});
		return new Promise<Credentials>((res, rej) => {
			res(token.tokens);
		})
	}
	public async getUserEmail(token: Credentials): Promise<string> {
		this.oAuth2Client.setCredentials(token);
		const profile = google.oauth2({
			auth: this.oAuth2Client,
			version: 'v2'
		});
		let email = null;
		await profile.userinfo.get().then(res => {
			email = res.data.email;
		}).catch(err => {
			console.log(err);
		});
		if (email)
			return email;
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
			return { url: 'http://localhost:8081/home?email=' + email + '&token=' + t.access_token};
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

	public async listCalendars(email: string) {
		const token = await this.userService.getSpecificService('google', email);
		if (token == undefined)
			return 404
		this.oAuth2Client.setCredentials(token)
		const calendar = google.calendar({version: 'v3', auth: this.oAuth2Client});
		
		const list = await calendar.calendarList.list();
		return list.data.items;
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