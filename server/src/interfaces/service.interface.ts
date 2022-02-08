import { ITask } from "src/interfaces/task.interface";
import { ATrigger } from "./trigger.interface";

export type ExtractInstanceType<T> = T extends new () => infer R ? R : never;

export interface IService {
	name: string;
	id: number;
	icon: string;
	actions: string[];
	reactions: string[];
}