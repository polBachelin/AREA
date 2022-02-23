import { Injectable, Logger } from "@nestjs/common";
import { AxiosRequestConfig } from "@nestjs/common/node_modules/axios";
import { InjectModel } from "@nestjs/mongoose";
import axios, {AxiosPromise} from 'axios';
import { Model } from "mongoose";
import { User, UsersService } from "src/users/users.service";
import { IDiscord } from "src/models/Discord";
import { AuthService } from "src/auth/auth.service";
import { RegisterDTO } from "src/users/register.dto";

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

	constructor(
		@InjectModel('Discord') private discordModel: Model<IDiscord>,
		private userService: UsersService,
		private authService: AuthService
	) {}

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
			Logger.log(error);
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

	public setDiscordToken(email: string, discordToken: Object) {
		this.userService.findOne(email).then(res => {
			const userDiscord = new this.discordModel(discordToken);
			res.discord = userDiscord;
			res.save();
		return this.userService.sanitizeUser(res)
		});
	}

	public async LoginByDiscord(email: string, discToken: string) {
		if (email) {
			let user = await this.userService.findOne(email);
			if (!user) {
				let RegisterDTO: RegisterDTO;
				RegisterDTO = {email:email, password:''};
				user = await this.userService.createUser(RegisterDTO);				
			}
			this.setDiscordToken(email, discToken);
			const token = await this.authService.signUser(user);
			return { url: 'http://localhost:8080/home?email=' + email + '&token=' + token.access_token};
		}
	}
}