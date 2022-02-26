import { ATrigger } from "../../../../interfaces/trigger.interface";
import { ATask, properties } from "src/interfaces/task.interface";
import { Client } from 'discord.js'
import {client } from '../discord.service'

export class ReceiveMessage extends ATrigger {

	setup(callback: () => Promise<void>): void {
		const userTarget = this.data.get('target')
		const token = process.env.DISCORD_BOT_TOKEN;

		client.on('message', async(msg) => {
			if (userTarget && `${msg.author.username}#${msg.author.discriminator}` !== userTarget) return
			const trig = new ReceiveMessage(this.name, this.data);
			this.lastExec = new Date()
			callback();
			trig.setup(callback);
		})
		client.login(token)
	}
}