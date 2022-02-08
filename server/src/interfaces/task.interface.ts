export type properties = Map<string, any>

export abstract class ATask {
	id: number;
	name: string;
	data: properties;

	constructor(id: number, name: string, data: properties) {
		this.id = id;
		this.name = name;
		this.data = data;
	}

	abstract run(): Promise<any> 
}