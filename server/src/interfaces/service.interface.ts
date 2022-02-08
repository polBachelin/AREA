export type ExtractInstanceType<T> = T extends new () => infer R ? R : never;

export interface IService {
	name: string;
	id: number;
	icon: string;
	actions: string[];
	reactions: string[];
}