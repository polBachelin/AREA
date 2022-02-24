import * as mongoose from 'mongoose'

export const intraSchema = new mongoose.Schema({
    autologin: {type: String},
    gpa: {type: Number}
});

export interface IIntra extends Document {
    autologin: {type: String},
    gpa: {type: Number}
}