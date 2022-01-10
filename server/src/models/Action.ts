import {Schema, model } from 'mongoose';

export interface IAction {
	_name: string;
	_serviceId: number;
	_actionId: number;
}

export const ActionSchema = new Schema<IAction>({
	_name: {type: String, unique: true, required: true},
	_serviceId: {type: Number, required: true},
	_actionId: {type: Number, required: true},
});

const ActionModel = model<IAction>('Action', ActionSchema);

export default ActionModel;