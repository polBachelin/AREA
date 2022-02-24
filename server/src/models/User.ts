import * as mongoose from 'mongoose';
import { INotion, notionSchema } from './Notion';
import {IArea, areaSchema} from './Area';
import { intraSchema } from './Intra';
import { oauthToken } from './OauthToken';

export interface IUser extends Document {
	email: string;
	password: string;
	notion: {type: INotion};
	areas: [IArea];
}

export const userSchema = new mongoose.Schema({
	email: {type: String, unique: true, required: true},
	password: {type: String},
	notion: {type: notionSchema , required: false},
	intra: {type: intraSchema, required: false},
	discord: {type: oauthToken, required: false},
	google: {type: oauthToken, required: false},
	areas: { type: [areaSchema], required: false}
});

// const UserModel = model<IUser>('User', schema);

// export default UserModel;

// export async function createUser(username: string, email: string, password: string): Promise<IUser> {
// 	const user = new UserModel({
// 		_email: email,
// 		_password: password,
// 		_areas: []
// 	});
// 	return user.save();
// }

// export async function deleteUser(email: string) {
// 	UserModel.findOneAndDelete( {_email: email });
// }

// async function updateUser(email: string, update: object)
// {
// 	const filter = { _email: email};
// 	await UserModel.findOneAndUpdate(filter, update);
// }

// export async function updateUserPassword(email: string, password: string) {
// 	const update = { _password: password};
// 	updateUser(email, update);
// }

// export async function updateUserEmail(email: string, newEmail: string) {
// 	const update = { _email: newEmail};
// 	updateUser(email, update);
// }
