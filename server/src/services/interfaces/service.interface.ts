import { ITask } from "src/tasks/interfaces/task.interface";

export interface IService {
	name: string;
	id: number;
	icon: string;
	actions: ITask[];
	reactions: ITask[];
}