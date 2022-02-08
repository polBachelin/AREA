export type properties = Map<string, any>

export abstract class ATask {
	id: number;
	name: string;
	
	abstract run(): Promise<any> 
}