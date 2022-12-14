import { Logger } from "@nestjs/common";
import { ATask } from "src/interfaces/task.interface";
import { notionClient } from "../notion.service";

export class CreatePage extends ATask {
	
	async run(user: any): Promise<any> {
		const database_id = this.data['database_id'] || undefined;
		const title = this.data['title'] || undefined;

		if (!database_id || !title) throw 'Invalid Data'
		try {
			const res = await notionClient.pages.create({
				auth:user.notion.access_token,
				parent: {
					database_id: database_id
				},
				properties: {
        				title: [
				        {
							type: "text",
	            			text: {
              					content: title,

            				},
				        },],
      				},
			});
		} catch(err) {
			Logger.log(err);
			throw err;
		}
		return undefined;
	}
}