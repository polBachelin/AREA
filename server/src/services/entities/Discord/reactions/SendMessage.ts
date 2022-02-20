import { ATask, properties } from "../../../../interfaces/task.interface";
import { Client } from 'discord.js'

export class SendMessage extends ATask {

	client = new Client({intents: "GUILD_MESSAGES"});

	run(user: any): Promise<any> {
		if (!this.client.token) this.client.login(user.discord.access_token);
		const id = this.data.get('user_id');
		const content = this.data.get('message_content');

		//this.client.on('send')
		// this.client.users.fetch(id).then((res) => {
		// 	console.log(res)
		// }).catch((err) => {
		// 	console.log(err)
		// })
		console.log("sending message discord task")
		return undefined;
	}
}