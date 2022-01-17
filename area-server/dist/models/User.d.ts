/// <reference types="mongoose" />
import { IArea } from './Area';
interface IUser {
    _username: string;
    _email: string;
    _password: string;
    _areas: IArea[];
}
declare const UserModel: import("mongoose").Model<IUser, {}, {}, {}>;
export default UserModel;
export declare function createUser(username: string, email: string, password: string): Promise<IUser>;
export declare function deleteUser(email: string): Promise<void>;
export declare function updateUserPassword(email: string, password: string): Promise<void>;
export declare function updateUserUsername(email: string, username: string): Promise<void>;
export declare function updateUserEmail(email: string, newEmail: string): Promise<void>;
