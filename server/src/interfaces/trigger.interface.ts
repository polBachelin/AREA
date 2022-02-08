export abstract class ATrigger {
	name: string;
	id: number;
	lastExec: Date | undefined;
	intervalObj: NodeJS.Timeout;

	public constructor(init?: ATrigger) {
		Object.assign(this, init);
	}

	public abstract setup(callback: (data: void) => Promise<void>): void;
	
	public stop(): void {
		clearInterval(this.intervalObj);
	};
}
