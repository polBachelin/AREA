import { ATask, properties } from "./task.interface";

export const REFRESH_RATE = 1000

export abstract class ATrigger {
	name: string;
	lastExec: Date | undefined;
	data: properties
	intervalObj: NodeJS.Timeout;

	public constructor(name: string, props: properties) {
		this.name = name;
		this.data = props
	}

	public abstract setup(callback: () => Promise<void>): void;
	
	public stop(): void {
		clearInterval(this.intervalObj);
	};
}
