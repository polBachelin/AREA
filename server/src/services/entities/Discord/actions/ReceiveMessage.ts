import { ATrigger } from "src/interfaces/trigger.interface";
import { ATask, properties } from "../../../../interfaces/task.interface";

export class ReceiveMessage extends ATrigger {

	setup(callback: (reaction: ATask) => Promise<void>): void {}
}