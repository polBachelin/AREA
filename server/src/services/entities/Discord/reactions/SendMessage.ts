import { ATask, properties } from "../../../../interfaces/task.interface";
import { Client, GuildChannel, TextChannel } from 'discord.js'

export class SendMessage extends ATask {

	client = new Client({intents: "GUILD_MESSAGES"});
	
	constructor(name: string, data: properties) {
		super(name, data);
		this.client.login("Mjg2OTU5NTgxNDg4NDgwMjY3.WLiB7w.XApM2voxDIVQ_nHBdhBwRBdEyuc");
	}

	async run(user: any): Promise<any> {
		let t: string = user.discord.access_token;
		const id = this.data.get('guild_id');
		const content = this.data.get('message_content');
		//if (!id || !content) throw 'Invalid Data'
		let channel = undefined;
		
		this.client.on('ready', async () => {
			console.log(`DiscordService: Discord bot Logged in as ${this.client.user?.tag}!`);
		});
		console.log("ID === ", id);
		console.log("ACCESS_TOKEN == ", user.discord.access_token);
		try {
			channel = await this.client.channels.fetch(id);
		} catch(err) {
			console.log(err)
		}
		console.log(this.client.channels);
		// this.client.on('ready', () => {
		// 	this.client.channels.fetch(id).then(res => {
		// 		channel = res
		// 		console.log(channel);
		// 	}).catch(err => {
		// 		console.log(err);
		// 	});
		// })
        // if (!channel) throw 'Invalid Channel'
        // const tc = channel as TextChannel
        // await tc.send(content)
		console.log("sending message discord task")
		return undefined;
	}
}