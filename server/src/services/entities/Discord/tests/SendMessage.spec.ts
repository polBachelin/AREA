import { IUser } from "src/models/User";
import { SendMessage } from "../reactions/SendMessage";

describe("SendMessage", () => {
	it("should send message", () =>{
		const props: Map<string, any> = new Map<string, any>([
			["guild_id", "286961972589625344"],
			["message_content", "Hello sent from AREA"]
		]);
		const instance = new SendMessage("Test", props);
		const user = {
			"discord": {
				"access_token": "Mjg2OTU5NTgxNDg4NDgwMjY3.WLiB7w.XApM2voxDIVQ_nHBdhBwRBdEyuc"
			}
		};
		instance.run(user).then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err);
		});
	})
})