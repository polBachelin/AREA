import * as mongoose from 'mongoose'

export const oauthToken = new mongoose.Schema({
    access_token: {type: String},
    token_type: {type: String},
    expires_in: {type: Number},
    refresh_token: {type: String},
    scope: {type: String}
});

export interface IOauthToken extends Document {
  access_token: {type: String},
    token_type: {type: String},
    expires_in: {type: Number},
    refresh_token: {type: String},
    scope: {type: String}
}
