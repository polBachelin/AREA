import {Schema, model } from 'mongoose';
import { IAction, ActionSchema} from './Action'
import { IReaction, ReactionSchema } from './Reaction'

declare enum status {
	DISABLE = 0,
	ENABLED = 1
}

export type areaStatus = keyof typeof status;

export interface IArea {
	_name: string;
	_status: boolean;
	_action: IAction[];
	_reaction: IReaction[];
}

export const AreaModelSchema = new Schema<IArea>({
	_name: {type: String, unique: true, required: true},
	_status: Boolean,
	_action: [ActionSchema],
	_reaction: [ReactionSchema],
});

const AreaModel = model<IArea>('Area', AreaModelSchema);

export default AreaModel;