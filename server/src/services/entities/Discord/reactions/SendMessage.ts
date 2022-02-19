import { ATask, properties } from "src/interfaces/task.interface";

export class SendMessage extends ATask {
	run(): Promise<any> {
		console.log("sending message discord task")
		return undefined;
	}
}