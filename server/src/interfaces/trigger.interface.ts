import { Logger } from "@nestjs/common";
import { IUser } from "src/models/User";
import { ATask, properties } from "./task.interface";

export const REFRESH_RATE = 10000
export enum TriggerState {
	CHECKING,
	RUNNING,
	STOPPED
};

export abstract class ATrigger {
	name: string;
	lastExec: Date | undefined;
	data: properties
	intervalObj: NodeJS.Timeout;
	state: TriggerState;

	public constructor(name: string, props: properties) {
		this.name = name;
		this.data = props;
		this.state = TriggerState.STOPPED;
	}

	public abstract setup(callback: () => Promise<void>, user: IUser): void;
	
	public stop(): void {
		clearInterval(this.intervalObj);
	};

	public isRunning(): boolean {
		if (this.state == TriggerState.RUNNING)
			return true;
		return false;
	}

	public setRunning(): void {
		this.state = TriggerState.RUNNING;
	}

	public setChecking(): void {
		this.state = TriggerState.CHECKING
	}

}
