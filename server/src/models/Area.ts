import * as mongoose from 'mongoose';

export interface IArea extends Document {
	name: string;
	actionName: string;
	reactionName: string;
}

export const areaSchema = new mongoose.Schema({
	name: {type: String, unique: true, required: true},
	actionName: {type: String},
	reactionName: {type: String}
});