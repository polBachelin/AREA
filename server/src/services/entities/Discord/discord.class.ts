import { IService } from "src/interfaces/service.interface";

export class Discord implements IService {
	id: number;
	name: string;
	icon: string;
	actions: string[];
	reactions: string[];

	constructor() {
		this.name = "Discord",
		this.id = parseInt(process.env.DISCORD),
		this.icon = "https://banner2.cleanpng.com/20180716/gjb/kisspng-discord-computer-icons-logo-smiley-decal-avatar-discord-5b4c86db5cb894.5744109815317419153798.jpg",
		this.actions = ["ReceiveMessage"];
		this.reactions = ["Send a message"];
	}
}

let discord = new Discord();
export { discord };