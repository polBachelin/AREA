import { Schema } from 'mongoose';
export interface IAction {
    _name: string;
    _serviceId: number;
    _actionId: number;
}
export declare const ActionSchema: Schema<IAction, import("mongoose").Model<IAction, any, any, any>, any, any>;
declare const ActionModel: import("mongoose").Model<IAction, {}, {}, {}>;
export default ActionModel;
