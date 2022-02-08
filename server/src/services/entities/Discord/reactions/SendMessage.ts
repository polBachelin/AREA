import { ITask, properties } from "../../../../interfaces/task.interface";

export let SendMessage: ITask = {
	id: 0,
	name: "Send a message",
	lastExec: undefined,

	run(callback: Promise<properties>): properties {
		return undefined;
	}
}