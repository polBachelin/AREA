import { ATrigger } from "src/interfaces/trigger.interface";
import { ATask, properties } from "src/interfaces/task.interface";
import { Client } from 'discord.js'

export class ReceiveMessage extends ATrigger {

	client = new Client({intents: "DIRECT_MESSAGES"});

	setup(callback: () => Promise<void>): void {
		const userTarget = this.data.get('target')
		const token = this.data.get('token');

		this.client.on('message', async(msg) => {
			if (userTarget && `${msg.author.username}#${msg.author.discriminator}` !== userTarget) return
			const trig = new ReceiveMessage(this.name, this.data);
			this.lastExec = new Date()
			callback();
			trig.setup(callback);
		})
		this.client.login(token)
	}
}