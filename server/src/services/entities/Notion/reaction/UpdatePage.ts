import { Logger } from "@nestjs/common";
import { ATask } from "src/interfaces/task.interface";
import { notionClient } from "../notion.service";

export class CreatePage extends ATask {
	
	async run(user: any): Promise<any> {
		const database_id = this.data.get('database_id') || undefined;
		const title = this.data.get('title') || undefined;

		Logger.log("CALLBACK NOTION REACT");
		if (!database_id || !title) throw 'Invalid Data'

		try {
			const res = await notionClient.pages.create({
				parent: {
					database_id: database_id
				},
				properties: {
					Name: {
						title: [{
							text: {
								content: title
							}
						}]
					}
				}
			});
			Logger.log(res);
		} catch(err) {
			Logger.log(err);
			throw err;
		}
		return undefined;
	}
}