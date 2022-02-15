import { ConsoleLogger, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ActionsFactory, actionKeys, ReactionsFactory, reactionKeys } from "src/services/allServices";
import { Area } from "src/area/area.class"
import { ATrigger } from "src/interfaces/trigger.interface";
import { ATask, properties } from "src/interfaces/task.interface";
import { InjectModel } from "@nestjs/mongoose";
import { IArea } from "src/models/Area";
import { Model } from 'mongoose';
import { AreaDTO } from "./area.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AreaService {
	areas: Map<string, Area[]> = new Map();

	constructor(
		@InjectModel('Area') private areaModel: Model<IArea>,
		private userService: UsersService
	) {}

	public async createArea(userEmail: string, areaName: string, 
		actionName: actionKeys, reactionName: reactionKeys, 
		actionData: properties, reactionData: properties) {
		if (await this.areaModel.findOne({areaName})) {
			throw new HttpException('area already exists', HttpStatus.BAD_REQUEST);
		}
		let areaAction = ActionsFactory.buildTask(actionName, actionName, actionData) as ATrigger;
		let areaReaction = ReactionsFactory.buildTask(reactionName as reactionKeys, reactionName, reactionData) as ATask;
		const area: Area = new Area({
			name: areaName,
			action: areaAction,
			reaction: areaReaction,
		});
		let userAreas: Area[] = this.areas[userEmail];
		if (userAreas == undefined) {
			this.areas.set(userEmail, [area])
		} else {
			userAreas.push(area);
		}
		const newArea = new this.areaModel({
			name: areaName,
			actionName: actionName,
			reactionName: reactionName
		});
		const user = await this.userService.findOne(userEmail);
		user.areas.push(newArea);
		user.save();
		console.log(user)
	}

	public async enableAnArea(userEmail: string, areaName: string) {
		let areaModel = await this.areaModel.findOne({areaName});
		if (areaModel) {
			let userAreas: Area[] = this.areas.get(userEmail);
			userAreas.forEach((j) => {
				if (j.name == areaName)
					j.enable();
			})
		}
	}
}