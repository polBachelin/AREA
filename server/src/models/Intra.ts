import * as mongoose from 'mongoose'

export const intraSchema = new mongoose.Schema({
    email: {type: String},
    autologin: {type: String},
    gpa: {type: Number}
});

export interface IIntra extends Document {
    email: {type: String},
    autologin: {type: String},
    gpa: {type: Number}
}

export interface Intra {
    autologin: string
}