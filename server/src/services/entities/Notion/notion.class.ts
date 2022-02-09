import { IService } from "../../../interfaces/service.interface";
import { AddToDB } from "./actions/AddToDB";

export class Notion implements IService {
	id: number;
	name: string;
	icon: string;
	actions: string[];
	reactions: string[];

	constructor() {
		this.id = parseInt(process.env.NOTION);
		this.name = "Notion";
		this.icon = "https://img.icons8.com/ios/500/notion.png";
		this.actions = [
			"Add to database"
		];
		this.reactions = [

		];
	}
}

let notion = new Notion();
export { notion };