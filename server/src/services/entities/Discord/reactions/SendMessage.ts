import { ATask, properties } from "../../../../interfaces/task.interface";

export class SendMessage extends ATask {
	id: number;
	name: string;
	data: properties;

	run(): Promise<any> {
		return undefined;
	}
}