import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "@nestjs/common/node_modules/axios";
import axios, {AxiosPromise} from 'axios';

const CLIENT_ID = '286959581488480267'
const CLIENT_SECRET = 'EmhaycziVCFdud6Awg91r-B1Dy7M8gbY'
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A8080'

@Injectable()
export class DiscordService {
	public authorize(code: string): AxiosPromise<any> {
		const param = new URLSearchParams();
		param.append('client_id', CLIENT_ID);
		param.append('client_secret', CLIENT_SECRET);
		param.append('grant_type', 'authorization_code');
		param.append('code', code);
		param.append('redirect_uri', REDIRECT_URI);
		const options: AxiosRequestConfig = {
			headers: {
				"Content-Type": 'application/x-www-form-urlencoded',
			}
		};
		return axios.post("https://discord.com/api/oauth2/token", param, options);
	}	
}