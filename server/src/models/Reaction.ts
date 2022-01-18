import {Schema, model } from 'mongoose';

export interface IReactionDB {
	_name: string;
	_serviceId: number;
	_reactionId: {type: Number, required: true},

}

export const ReactionSchema = new Schema<IReactionDB>({
	_name: {type: String, unique: true, required: true},
	_serviceId: {type: Number, required: true},
	_reactionId: {type: Number, required: true},
});

const ReactionModel = model<IReactionDB>('Reaction', ReactionSchema);

export default ReactionModel;