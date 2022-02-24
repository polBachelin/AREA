import { ATask, properties } from "../../../../interfaces/task.interface";
import { Client, GuildChannel, TextChannel } from 'discord.js'

export class SendMessage extends ATask {

	client = new Client();
	
	constructor(name: string, data: properties) {
		super(name, data);
		let envToken = process.env.DISCORD_BOT_TOKEN;
	}
	
	async run(user: any): Promise<any> {
		this.client.login(user.discord.access_token);
		const id = this.data.get('guild_id');
		const content = this.data.get('message_content');

		if (!id || !content) throw 'Invalid Data'
		let channel = undefined;

		if (!this.client.readyAt) {
            let wait = true
            this.client.on('ready', async () => {
                wait = false
            })
            let i = 0
            for (; i < 60 && wait; i++) {
                await new Promise((resolve) => setTimeout(resolve, 1000))
            }
            console.log('DEBUG: Discord cold start:', i)
        }

		try {
			channel = this.client.channels.cache.get(id);
			console.log(this.client.guilds.cache)
			console.log(this.client.channels.cache)
			console.log(this.client.readyAt);
			if (!channel) throw 'Invalid Channel'
			const tc = channel as TextChannel
			await tc.send(content)
		} catch(err) {
			throw err
		}

		return undefined;
	}
}