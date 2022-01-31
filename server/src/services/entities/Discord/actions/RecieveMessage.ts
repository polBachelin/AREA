import { ITask } from "../../../../tasks/interfaces/task.interface";

export let RecieveMessage: ITask = {
	id: 0,
	name: "Recieve a message",
	lastExec: undefined,

	run(callback: Promise<void>): void {}
}