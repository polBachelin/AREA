import { IService, ExtractInstanceType } from "../../../interfaces/service.interface";
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

const notionMap = {
	"Add to database": AddToDB
};
type Keys = keyof typeof notionMap;
type notionTypes = typeof notionMap[Keys];

export class NotionFactory {
	static buildTask(k: Keys): ExtractInstanceType<notionTypes> {
		return new notionMap[k]();
	}
}