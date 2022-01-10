import {Schema, model } from 'mongoose';

export interface IReaction {
	_name: string;
	_serviceId: number;
	_reactionId: {type: Number, required: true},

}

export const ReactionSchema = new Schema<IReaction>({
	_name: {type: String, unique: true, required: true},
	_serviceId: {type: Number, required: true},
	_reactionId: {type: Number, required: true},
});

const ReactionModel = model<IReaction>('Reaction', ReactionSchema);

export default ReactionModel;