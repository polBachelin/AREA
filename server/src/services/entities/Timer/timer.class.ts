import { IService } from "src/interfaces/service.interface";

export class Timer implements IService {
    id: number;
    name: string;
    icon: string;
	actions: string[];
	reactions: string[];

	constructor() {
		this.name = "Timer",
		this.id = parseInt(process.env.TIMER),
		this.icon = "https://cdn-icons-png.flaticon.com/512/3003/3003202.png",
		this.actions = ["Start timer"];
		this.reactions = [""];
	}
}

let timer = new Timer();
export { timer };