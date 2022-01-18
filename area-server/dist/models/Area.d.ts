import { Schema } from 'mongoose';
import { IAction } from './Action';
import { IReaction } from './Reaction';
declare enum status {
    DISABLE = 0,
    ENABLED = 1
}
export declare type areaStatus = keyof typeof status;
export interface IArea {
    _name: string;
    _status: boolean;
    _action: IAction[];
    _reaction: IReaction[];
}
export declare const AreaModelSchema: Schema<IArea, import("mongoose").Model<IArea, any, any, any>, any, any>;
declare const AreaModel: import("mongoose").Model<IArea, {}, {}, {}>;
export default AreaModel;
