import { Schema } from 'mongoose';
export interface IReaction {
    _name: string;
    _serviceId: number;
    _reactionId: {
        type: Number;
        required: true;
    };
}
export declare const ReactionSchema: Schema<IReaction, import("mongoose").Model<IReaction, any, any, any>, any, any>;
declare const ReactionModel: import("mongoose").Model<IReaction, {}, {}, {}>;
export default ReactionModel;
