export type properties = Map<string, any>

export abstract class ITask {
	id: number;
	name: string;
	
	abstract run(callback: Promise<properties>): properties 
}