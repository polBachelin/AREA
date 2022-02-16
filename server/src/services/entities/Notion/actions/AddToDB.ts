import { ATask } from "src/interfaces/task.interface";
import { ATrigger } from "src/interfaces/trigger.interface";
import { notionClient } from "../notion.service";

export class AddToDB extends ATrigger {

	lastUpdateCheck: Date

	setup(callback: () => Promise<void>): void {
		this.intervalObj = setInterval(async () => {
			this.lastUpdateCheck = new Date()
			const db_id = this.data.get('database_id') || ''
			const access_token = this.data.get('access_token')
			let db = await notionClient.databases.retrieve({auth: access_token, database_id: db_id});
			let newDate = new Date(db.last_edited_time)
			if (newDate > this.lastUpdateCheck) {
				callback()
				this.lastExec = new Date()
			}
		})
	}
}