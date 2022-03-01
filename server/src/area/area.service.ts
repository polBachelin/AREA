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
import { IUser } from "src/models/User";

@Injectable()
export class AreaService {
	areas: Map<string, Area[]> = new Map();

	constructor(
		@InjectModel('Area') private areaModel: Model<IArea>,
		private userService: UsersService
	) {
		this.syncAllAreas();
	}

	private async syncAllAreas() {
		let cursor = this.userService.getCursor();

		for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
			let areaLen = doc.areas.toString()
			if (areaLen) {
				doc.areas.forEach((j) => {
					this.newArea(j.name, j.actionName as actionKeys, j.reactionName as reactionKeys, j.actionData, j.reactionData)
					.then((res) => {
						let userAreas: Area[] = this.areas.get(doc.email);
						if (!userAreas) {
							this.areas.set(doc.email, [res])
						} else {
							userAreas.push(res);
						}
					})
				})
			}
		}
	}

	public async areaExists(userEmail: string, areaName: string) {
		let user = await this.userService.findOne(userEmail);
		if (await this.userService.findArea(user, areaName))
			return true;
		return false;
	}

	private async newArea(areaName: string, actionName: actionKeys, reactionName: reactionKeys,
		actionData: properties, reactionData: properties): Promise<Area> {
		let areaAction = ActionsFactory.buildTask(actionName, actionName, actionData) as ATrigger;
		let areaReaction = ReactionsFactory.buildTask(reactionName, reactionName, reactionData) as ATask;
		const area: Area = new Area({
			name: areaName,
			action: areaAction,
			reaction: areaReaction,
		});
		return area;
	}

	public async createArea(userEmail: string, areaName: string, 
		actionName: actionKeys, reactionName: reactionKeys, 
		actionData: properties, reactionData: properties) {
		let user = await this.userService.findOne(userEmail)
		if (await this.userService.findArea(user, areaName)) {
			return {error: "This area name already exists"};
		}
		let area = await this.newArea(areaName, actionName, reactionName, actionData, reactionData);
		let userAreas: Area[] = this.areas.get(userEmail);
		if (userAreas == undefined) {
			this.areas.set(userEmail, [area])
		} else {
			userAreas.push(area);
		}
		const newArea = new this.areaModel({
			name: areaName,
			actionName: actionName,
			reactionName: reactionName,
			actionData: actionData,
			reactionData: reactionData
		});
		user.areas.push(newArea);
		user.save();
	}

	public async deleteAnArea(userEmail: string, areaName: string) {
		let area = await this.getArea(userEmail, areaName);
		
		if (!area) return "No area with this name"
		let user = await this.userService.findOne(userEmail);
		user.areas.forEach(el => {
			if (el.name == areaName) {
				user.areas.splice(user.areas.indexOf(el), 1);
			}
		})
		user.save();
	}

	public async enableAnArea(userEmail: string, areaName: string) {
		if (await this.areaExists(userEmail, areaName)) {
			let userAreas: Area[] = this.areas.get(userEmail);
			userAreas.forEach(async (j) => {
				if (j.name == areaName) {
					j.enable(await this.userService.findOne(userEmail));
					return;
				}
			})
		}
	}

	public async disableArea(userEmail: string, areaName: string) {
		if (await this.areaExists(userEmail, areaName)) {
			let userAreas: Area[] = this.areas.get(userEmail);
			userAreas.forEach(async (j) => {
				if (j.name == areaName) {
					j.disable();
					return;
				}
			})
		}
	}

	public async getUserAreas(email: string): Promise<Area[]> {
		return this.areas.get(email)
	}

	public async getArea(email: string, areaName: string): Promise<Area> {
		return this.areas.get(email).find((j) => {
			if (j.name === areaName)
				return j;
		});
	}
}