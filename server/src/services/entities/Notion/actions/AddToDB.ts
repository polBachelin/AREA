import { ATask } from "src/interfaces/task.interface";
import { ATrigger, REFRESH_RATE } from "../../../../interfaces/trigger.interface";
import { IUser } from "src/models/User";
import { notionClient } from "../notion.service";

export class AddToDB extends ATrigger {

	lastUpdateCheck: Date

	setup(callback: () => Promise<void>, user: any): void {
		this.setChecking();
		this.intervalObj = setInterval(async () => {
			this.lastUpdateCheck = new Date()
			const db_id = this.data.get('database_id') || undefined;
			const access_token = user.notion.access_token;
			if (!db_id) throw 'invalid data';
			let db = await notionClient.databases.retrieve({auth: access_token, database_id: db_id});
			let newDate = new Date(db.last_edited_time)
			if ((this.lastUpdateCheck != undefined && !this.isRunning()) && (newDate.getHours() >= this.lastUpdateCheck.getHours() && newDate.getMinutes() >= this.lastUpdateCheck.getMinutes())) {
				callback()
				this.setRunning()
				this.lastExec = new Date()
			}
		}, REFRESH_RATE)
	}
} export type properties = Map<string, any>
