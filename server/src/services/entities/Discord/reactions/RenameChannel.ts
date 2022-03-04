import { ATask, properties } from "../../../../interfaces/task.interface";
import { Client, GuildChannel, TextChannel } from 'discord.js'
import { client, readyBot } from "../discord.service";
import { Logger } from "@nestjs/common";

export class RenameChannel extends ATask {
	
	async run(user: any): Promise<any> {		
		const id = this.data['guild_id'] || undefined;
		const name = this.data['channel_name'] || undefined;
		
		if (!id || !name) throw 'Invalid Data'
		let channel = undefined;		

		await readyBot();
		
		try {
			channel = client.channels.cache.get(id);
			if (!channel) throw 'Invalid Channel'
			const tc = channel as TextChannel
			await tc.setName(name);
		} catch(err) {
			Logger.log(err);
			throw err
		}
		return undefined;
	}
}