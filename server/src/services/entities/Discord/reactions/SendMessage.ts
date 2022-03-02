import { ATask, properties } from "../../../../interfaces/task.interface";
import { Client, GuildChannel, TextChannel } from 'discord.js'
import { client, readyBot } from "../discord.service";
import { Logger } from "@nestjs/common";

export class SendMessage extends ATask {
	
	async run(user: any): Promise<any> {
		let envToken = process.env.DISCORD_BOT_TOKEN;
		client.login(envToken);
		
		const id = this.data.get('guild_id') || undefined;
		const content = this.data.get('message_content') || undefined;
		
		Logger.log("CALLBACK DISCORD REACT");
		if (!id || !content) throw 'Invalid Data'
		let channel = undefined;		

		readyBot();
		
		try {
			channel = client.channels.cache.get(id);
			if (!channel) throw 'Invalid Channel'
			const tc = channel as TextChannel
			await tc.send(content)
		} catch(err) {
			Logger.log(err);
			throw err
		}

		return undefined;
	}
}