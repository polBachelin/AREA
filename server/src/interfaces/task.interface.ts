export type properties = Map<string, any>

export interface ITask {
	id: number;
	name: string;
	
	run(callback: Promise<properties>): properties 
}