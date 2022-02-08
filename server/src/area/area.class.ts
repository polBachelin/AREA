import { ATask } from "src/interfaces/task.interface";
import { ATrigger } from "src/interfaces/trigger.interface";

enum AreaState {
	STOPPED,
	CRASHED,
	DISABLED,
	ENABLED
};

export class Area {
	name: string;
	status: AreaState = AreaState.DISABLED;
	action: ATrigger;
	reaction: ATask;

	public constructor(init?: Partial<Area>) {
		Object.assign(this, init);
	}

	public enable() {
		this.status = AreaState.ENABLED;
		this.launch();
	}

	public disable() {
		this.status = AreaState.DISABLED;
		this.action.stop();
	}
	
	launch(): void {
		try {
			this.action.setup(async (reaction: ATask) => {
				try {
					await reaction.run();
				} catch (errror) {
					this.status = AreaState.CRASHED;
					this.disable();
				}
			})
		} catch (error) {
			console.log(error);
		}
		//this.action.setup()
	}
}