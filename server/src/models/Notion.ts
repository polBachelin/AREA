import * as mongoose from 'mongoose'

export const notionSchema = new mongoose.Schema({
    access_token: {type: String},
    workspace_id: {type: String},
    workspace_name: {type: String},
    workspace_icon: {type: String},
    bot_id: {type: String},
    owner: {type: Object}
});

export interface INotion extends Document {
    access_token: {type: String},
    workspace_id: {type: String},
    workspace_name: {type: String},
    workspace_icon: {type: String},
    bot_id: {type: String},
    owner: {type: Object}
}