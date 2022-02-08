import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { allServices, ActionsFactory, actionKeys, ReactionsFactory, reactionKeys } from "src/services/allServices";
import { Area } from "src/area/area.class"
import { ATrigger } from "src/interfaces/trigger.interface";
import { ATask } from "src/interfaces/task.interface";
import { InjectModel } from "@nestjs/mongoose";
import { IArea } from "src/models/Area";
import { Model } from 'mongoose';
import { AreaDTO } from "./area.dto";

@Injectable()
export class AreaService {

	constructor(
		@InjectModel('Area') private areaModel: Model<IArea>,
	) {}

	public async createArea(areaName: string, actionName: actionKeys, reactionName: reactionKeys) {
		if (await this.areaModel.findOne({areaName})) {
			throw new HttpException('area already exists', HttpStatus.BAD_REQUEST);
		}
		let areaAction = ActionsFactory.buildTask(actionName, "Add to database", 0) as ATrigger;
		let areaReaction = ReactionsFactory.buildTask(reactionName) as ATask;
		const area: Area = new Area({
			name: areaName,
			action: areaAction,
			reaction: areaReaction,
		});
		const newArea = new this.areaModel({
			name: areaName,
			actionName: actionName,
			reactionName: reactionName
		});
		await newArea.save();
		return area;
	}

	public enableAnArea(areaName: string) {

	}
}