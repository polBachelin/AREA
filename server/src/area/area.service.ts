import { Injectable } from "@nestjs/common";
import { allServices, ActionsFactory, actionKeys, ReactionsFactory, reactionKeys } from "src/services/allServices";
import { Area } from "src/area/area.class"
import { ATrigger } from "src/interfaces/trigger.interface";
import { ATask } from "src/interfaces/task.interface";


@Injectable()
export class AreaService {

	public createArea(areaName: string, actionName: actionKeys, reactionName: reactionKeys): Area {
		let areaAction = ActionsFactory.buildTask(actionName, "Add to database", 0) as ATrigger;
		let areaReaction = ReactionsFactory.buildTask(reactionName) as ATask;
		const area: Area = new Area({
			name: areaName,
			action: areaAction,
			reaction: areaReaction,
		});
		return area;
	}
}