export interface ITask {
	id: number;
	name: string;
	lastExec: Date | undefined;
	
	run(callback: Promise<void>): void 
}