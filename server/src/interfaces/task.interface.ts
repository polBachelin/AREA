export type properties = Map<string, any>

export abstract class ATask {
	name: string;
	data: properties;

	constructor(name: string, data: properties) {
		this.name = name;
		this.data = data;
	}

	abstract run(): Promise<any> 
}