import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "@nestjs/common/node_modules/axios";
import axios, {AxiosPromise} from 'axios';
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const CLIENT_ID = '286959581488480267'
const REDIRECT_URI = "http://localhost:3000/discord/auth"
const CLIENT_SECRET = 'EmhaycziVCFdud6Awg91r-B1Dy7M8gbY'

export interface DiscordOauthToken {
	access_token: string,
	token_type: string,
	expires_in: number,
	refresh_token: string,
	scope: string,
}

@Injectable()
export class DiscordService {
	public async authorize(code: string): Promise<DiscordOauthToken> {
		let token: DiscordOauthToken;

		try {
			let res = await oauth.tokenRequest({
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				code: code,
				scope: ["identify", "email"],
				grantType: "authorization_code",
				redirectUri: REDIRECT_URI
			});
			token = {
				access_token: res.access_token,
				token_type: res.token_type,
				expires_in: res.expires_in,
				refresh_token: res.refresh_token,
				scope: res.scope
			}
			return new Promise<DiscordOauthToken>((res, rej) => {
				res(token);
			})
		} catch(error) {
			console.log(error);
		}
	}

	public async getUserEmail(token: string): Promise<string> {
		
		try {
			let res = await oauth.getUser(token);
			return new Promise<string>((resolve, rej) => {
				resolve(res.email);
			})
		} catch(error) {
			console.log(error);
		}
	}

	public refreshToken(token: string): AxiosPromise<any> {
		const param = new URLSearchParams();
		param.append('client_id', CLIENT_ID);
		param.append('client_secret', CLIENT_SECRET);
		param.append('grant_type', 'refresh_token');
		param.append('refresh_token', token);
		const options: AxiosRequestConfig = {
			headers: {
				"Content-Type": 'application/x-www-form-urlencoded',
			}
		};
		return axios.post("https://discord.com/api/oauth2/token", param, options);

	}
}