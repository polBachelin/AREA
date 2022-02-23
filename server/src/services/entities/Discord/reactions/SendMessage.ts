import { ATask, properties } from "../../../../interfaces/task.interface";
import { Client, GuildChannel, TextChannel } from 'discord.js'

export class SendMessage extends ATask {

	client = new Client({intents: "GUILD_MESSAGES"});

	async run(user: any): Promise<any> {
		if (!this.client.token) this.client.login(user.discord.access_token);
		const id = this.data.get('guild_id');
		const content = this.data.get('message_content');
        if (!id || !content) throw 'Invalid Data'
		let channel = undefined;
		
		this.client.on('ready', () => {
			channel = this.client.channels.fetch(id);
			console.log(channel);
		})
        if (!channel) throw 'Invalid Channel'
        const tc = channel as TextChannel
        await tc.send(content)
		console.log("sending message discord task")
		return undefined;
	}
}