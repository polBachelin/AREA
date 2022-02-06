import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "@nestjs/common/node_modules/axios";
import axios, {AxiosPromise} from 'axios';
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const CLIENT_ID = '286959581488480267'
const REDIRECT_URI = "http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fauth"
const CLIENT_SECRET = 'EmhaycziVCFdud6Awg91r-B1Dy7M8gbY'

@Injectable()
export class DiscordService {
	public authorize(code: string): Promise<any> {
		const param = new URLSearchParams({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: REDIRECT_URI
		});
		// param.append('client_id', CLIENT_ID);
		// param.append('client_secret', CLIENT_SECRET);
		// param.append('grant_type', 'authorization_code');
		// param.append('code', code);
		// param.append('redirect_uri', REDIRECT_URI);
		const options: AxiosRequestConfig = {
			headers: {
				"Content-Type": 'application/x-www-form-urlencoded',				
			}
		};
		return axios.post('https://discord.com/api/v8/oauth2/token', param.toString(), options);
		// return oauth.tokenRequest({
		// 	clientId: CLIENT_ID,
		// 	clientSecret: CLIENT_SECRET,
		// 	code: code,
		// 	scope: "email",
		// 	grantType: "authorization_code",
		// 	redirectUri: "http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fauth"
		// });
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