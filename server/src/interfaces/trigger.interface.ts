import { ATask } from "./task.interface";

export abstract class ATrigger {
	name: string;
	id: number;
	lastExec: Date | undefined;
	intervalObj: NodeJS.Timeout;

	public constructor(name: string, id: number) {
		this.name = name;
		this.id = id;
	}

	public abstract setup(callback: (reaction: ATask) => Promise<void>): void;
	
	public stop(): void {
		clearInterval(this.intervalObj);
	};
}
