import { IService } from "src/interfaces/service.interface";

export class Weather implements IService {
    id: number;
    name: string;
    icon: string;
	actions: string[];
	reactions: string[];

	constructor() {
		this.name = "Weather",
		this.id = parseInt(process.env.WEATHER),
		this.icon = "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png",
		this.actions = ["City\'s weather change"];
		this.reactions = [""];
	}
}

let weather = new Weather();
export { weather };