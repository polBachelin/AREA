import { ATrigger } from "src/interfaces/trigger.interface";
import { ATask, properties } from "../../../../interfaces/task.interface";

export class ReceiveMessage extends ATrigger {

	setup(callback: (data: void) => Promise<void>): void {}
}