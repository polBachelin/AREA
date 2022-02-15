import { actionKeys, reactionKeys } from "src/services/allServices";
import { properties } from "src/interfaces/task.interface";

export interface AreaDTO {
	name: string,
	actionName: actionKeys,
	actionData: properties,
	reactionName: reactionKeys,
	reactionData: properties
}