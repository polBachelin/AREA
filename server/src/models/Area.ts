import * as mongoose from 'mongoose';
import { properties } from 'src/interfaces/task.interface';

export interface IArea extends Document {
	name: string;
	actionName: string;
	reactionName: string;
	actionData: properties;
	reactionData: properties;
}

export const areaSchema = new mongoose.Schema({
	name: {type: String, unique: true, required: true, sparse: true},
	actionName: {type: String},
	reactionName: {type: String},
	actionData: Map,
	reactoinData: Map,
});