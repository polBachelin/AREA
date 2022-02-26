import { IService } from "src/interfaces/service.interface";

export class GoogleCalendar implements IService {
	id: number;
	name: string;
	icon: string;
	actions: string[]
	reactions: string[];

	constructor() {
		this.id = undefined;
		this.name = "Google";
		this.icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/2048px-Google_Calendar_icon_%282020%29.svg.png";
		this.actions = [];
		this.reactions = [
			"Create an event"
		];
	}
}

let googleCalendar = new GoogleCalendar
export { googleCalendar };