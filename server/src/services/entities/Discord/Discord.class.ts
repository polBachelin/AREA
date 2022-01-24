import { IService } from "../../interfaces/service.interface";
import { RecieveMessage } from "./actions/RecieveMessage";

export let Discord: IService = {
	name: "Discord",
	id: parseInt(process.env.DISCORD),
	icon: "https://banner2.cleanpng.com/20180716/gjb/kisspng-discord-computer-icons-logo-smiley-decal-avatar-discord-5b4c86db5cb894.5744109815317419153798.jpg",
	actions: [RecieveMessage],
	reactions: []
}