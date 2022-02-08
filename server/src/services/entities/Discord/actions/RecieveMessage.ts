import { ITask, properties } from "../../../../interfaces/task.interface";

export let RecieveMessage: ITask = {
	id: 0,
	name: "Recieve a message",

	run(callback: Promise<properties>): properties {
		return undefined;
	}
}