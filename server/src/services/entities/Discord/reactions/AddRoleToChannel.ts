import { ATask, properties } from "../../../../interfaces/task.interface";
import { Channel, Client, GuildChannel, TextChannel } from 'discord.js'
import { client, readyBot } from "../discord.service";
import { Logger } from "@nestjs/common";

export class AddRoleToChannel extends ATask {
	
	async run(user: any): Promise<any> {		
		const id = this.data['guild_id'] || undefined;
		const role = this.data['role_id'] || undefined;

		if (!id || !role) throw 'Invalid Data'
		let channel: Channel = undefined;

		await readyBot();

		try {
			channel = client.channels.cache.get(id);
			if (!channel) throw 'Invalid channel'
			const tc = channel as TextChannel
			await tc.overwritePermissions([{id: role}])
		} catch(err) {
			Logger.log(err);
			throw err;
		}
		return undefined;
	}
}