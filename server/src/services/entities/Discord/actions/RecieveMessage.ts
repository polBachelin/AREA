import { ITask, properties } from "../../../../interfaces/task.interface";

export class RecieveMessage extends ITask {
	id: number;
	name: string;

	
	
	run(callback: Promise<properties>): properties {
		return undefined;
	}
}