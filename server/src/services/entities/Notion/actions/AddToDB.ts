import { ITask } from "../../../../tasks/interfaces/task.interface";

export let AddToDB: ITask = {
	id: 0,
	name: "Add to database",
	lastExec: undefined,

	run(callback: Promise<void>): void {}
}