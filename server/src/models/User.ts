import {Schema, model } from 'mongoose';
import { AreaModelSchema, IArea } from './Area';

interface IUser {
	_email: string;
	_password: string;
	_areas: IArea[]
}

const schema = new Schema<IUser>({
	_email: {type: String, unique: true, required: true},
	_password: {type: String, required: true},
	_areas: [AreaModelSchema],
});

const UserModel = model<IUser>('User', schema);

export default UserModel;

export async function createUser(username: string, email: string, password: string): Promise<IUser> {
	const user = new UserModel({
		_email: email,
		_password: password,
		_areas: []
	});
	return user.save();
}

export async function deleteUser(email: string) {
	UserModel.findOneAndDelete( {_email: email });
}

async function updateUser(email: string, update: object)
{
	const filter = { _email: email};
	await UserModel.findOneAndUpdate(filter, update);
}

export async function updateUserPassword(email: string, password: string) {
	const update = { _password: password};
	updateUser(email, update);
}

export async function updateUserEmail(email: string, newEmail: string) {
	const update = { _email: newEmail};
	updateUser(email, update);
}
