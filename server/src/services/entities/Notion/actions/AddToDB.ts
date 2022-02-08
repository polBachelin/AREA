import { ATask } from "src/interfaces/task.interface";
import { ATrigger } from "src/interfaces/trigger.interface";

export class AddToDB extends ATrigger {

	setup(callback: (reaction: ATask) => Promise<void>): void {}
}