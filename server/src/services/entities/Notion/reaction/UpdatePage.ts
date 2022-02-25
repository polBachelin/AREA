import { ATask } from "src/interfaces/task.interface";
import { notionClient } from "../notion.service";

export class UpdatePage extends ATask {
	
	run(user: any): Promise<any> {

		//notionClient.pages.update()
		return undefined;
	}
}