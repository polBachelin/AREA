import { IService, ExtractInstanceType } from "../../../interfaces/service.interface";
import { RecieveMessage } from "./actions/RecieveMessage";
import { SendMessage } from "./reactions/SendMessage";

export class Discord implements IService {
	id: number;
	name: string;
	icon: string;
	actions: string[];
	reactions: string[];

	constructor() {
		this.name = "Discord",
		this.id = parseInt(process.env.DISCORD),
		this.icon = "https =//banner2.cleanpng.com/20180716/gjb/kisspng-discord-computer-icons-logo-smiley-decal-avatar-discord-5b4c86db5cb894.5744109815317419153798.jpg",
		this.actions = ["ReceiveMessage"];
		this.reactions = ["SendMessage"];
	}
}

const discordMap = {
	"ReceiveMessage": RecieveMessage,
	"SendMessage": SendMessage
};
type Keys = keyof typeof discordMap;
type notionTypes = typeof discordMap[Keys];

export class DiscordFactory {
	static buildTask(k: Keys): ExtractInstanceType<notionTypes> {
		return new discordMap[k]();
	}
}