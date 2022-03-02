import * as mongoose from 'mongoose'

export const intraSchema = new mongoose.Schema({
    email: {type: String},
    autologin: {type: String},
    gpa: {type: Number},
    last_notif: {type: Date}
});

export interface IIntra extends Document {
    email: {type: String},
    autologin: {type: String},
    gpa: {type: Number},
    last_notif: {type: Date}
}

export interface Intra {
    autologin: string
}