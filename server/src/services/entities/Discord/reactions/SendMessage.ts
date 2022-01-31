import { ITask } from "../../../../tasks/interfaces/task.interface";

export let SendMessage: ITask = {
	id: 0,
	name: "Send a message",
	lastExec: undefined,

	run(callback: Promise<void>): void {}
}