import { Logger } from "@nestjs/common";
import { ATask } from "src/interfaces/task.interface";
import { ATrigger } from "src/interfaces/trigger.interface";
import { IUser } from "src/models/User";

export enum AreaState {
	DISABLED = 0,
	ENABLED = 1,
	STOPPED,
	CRASHED,
};

export class Area {
	name: string;
	status: AreaState = AreaState.DISABLED;
	action: ATrigger;
	reaction: ATask;

	public constructor(init?: Partial<Area>) {
		Object.assign(this, init);
	}

	public enable(user: any) {
		this.status = AreaState.ENABLED;
		this.launch(user);
	}

	public disable() {
		this.status = AreaState.DISABLED;
		this.action.stop();
	}
	
	launch(user: any): void {
		try {
			this.action.setup(async () => {
				try {
					await this.reaction.run(user);
					this.action.setChecking();
				} catch (errror) {
					this.status = AreaState.CRASHED;
					this.disable();
				}
			}, user)
		} catch (error) {
			console.log(error);
		}
	}
}