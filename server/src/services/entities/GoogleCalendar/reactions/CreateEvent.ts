import { ATask, properties } from "../../../../interfaces/task.interface";
import { OAuth2Client, Credentials} from 'google-auth-library';
import { google } from 'googleapis'
import { calendar } from "googleapis/build/src/apis/calendar";

export class CreateEvent extends ATask {
	private oAuth2Client: OAuth2Client;

	constructor(name: string, data: properties) {
		super(name, data);
		this.oAuth2Client = new google.auth.OAuth2();
	}

	async run(user: any): Promise<any> {
		const id = this.data.get('calendar_id');
		const token = user.google;
		const event = this.data.get('event');

		this.oAuth2Client.setCredentials(token);
		const calendar = google.calendar({version: "v3", auth: this.oAuth2Client});
		calendar.events.insert({
			auth: this.oAuth2Client,
			calendarId: id,
			requestBody: event
		}).then(res => {
			console.log("Google event has been created");
		}).catch(err => {
			console.log("Error on event creatoin ", err);
		})
	}
}