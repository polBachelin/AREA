import { IUser } from "src/models/User";
import { SendMessage } from "../reactions/SendMessage";

describe("SendMessage", () => {
	it("should send message", () =>{
		const props: Map<string, any> = new Map<string, any>([
			["user_id", "Polo#5032"],
			["message_content", "Hello sent from AREA"]
		]);
		const instance = new SendMessage("Test", props);
		const user = {
			"discord": {
				"access_token": "z7N7jwrJeINzr6GCn6WHRaKbX1G2Fw"
			}
		};
		instance.run(user);
	})
})