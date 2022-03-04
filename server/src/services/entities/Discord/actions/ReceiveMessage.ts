import { ATrigger } from "../../../../interfaces/trigger.interface";
import { ATask, properties } from "src/interfaces/task.interface";
import { Client } from 'discord.js'
import {client, readyBot } from '../discord.service'
import { Logger } from "@nestjs/common";

const DISCROD_REFRESH_RATE = 1000

export class ReceiveMessage extends ATrigger {

	setup(callback: () => Promise<void>): void {

		const id = this.data['guild_id']
		const token = process.env.DISCORD_BOT_TOKEN;
		this.setChecking();

		readyBot().then((res) => {});

		Logger.log("RECEIVE MESSAGE IS CHECKING")
		client.on('message', message => {
			if (message.channel.id == id) {
				Logger.log("RECEIVE MESSAGE TRIGGER");
				this.lastExec = new Date();
				callback();
				this.setRunning();
			}
		})
	}
}