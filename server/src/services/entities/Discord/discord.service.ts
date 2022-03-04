import { Injectable, Logger } from "@nestjs/common";
import { AxiosRequestConfig } from "@nestjs/common/node_modules/axios";
import { InjectModel } from "@nestjs/mongoose";
import axios, {AxiosPromise} from 'axios';
import { Model } from "mongoose";
import { User, UsersService } from "../../../users/users.service";
import { AuthService } from "../../../auth/auth.service";
import { RegisterDTO } from "../../../users/register.dto";
import { OauthTokenDoc } from "src/models/OauthToken";
import { Client, GuildChannel, TextChannel } from 'discord.js'

const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const REDIRECT_URI = "http://localhost:3000/discord/auth"

export interface DiscordOauthToken {
	access_token: string,
	token_type: string,
	expires_in: number,
	refresh_token: string,
	scope: string,
}

let client = new Client();
export {client};

export async function readyBot() {
	client.login(process.env.DISCORD_BOT_TOKEN);
	if (!client.readyAt) {
		let wait = true
		client.on('ready', async () => {
			wait = false;
		})
		while(wait == true) {
			await new Promise((res) => setTimeout(res, 1000))
		}
	}
}

@Injectable()
export class DiscordService {

	constructor(
		@InjectModel('Discord') private discordModel: Model<OauthTokenDoc>,
		private userService: UsersService,
		private authService: AuthService
	) {}

	public async authorize(code: string): Promise<DiscordOauthToken> {
		let token: DiscordOauthToken;

		try {
			Logger.log(process.env.DISCORD_CLIENT_ID);
			let res = await oauth.tokenRequest({
				clientId: process.env.DISCORD_CLIENT_ID,
				clientSecret: process.env.DISCORD_CLIENT_SECRET,
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

	public async addBot(code: string): Promise<any> {
		
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

	public async getDiscordToken(email: string) {
		let user = await this.userService.findOne(email).catch(err => {
			console.log("Could not find user - ", err);
		});
		return user.discord;
	}

	public async getChannels(): Promise<any> {
		await readyBot();
		let res = [];
		for await (const value of client.guilds.cache) {
			for await (const v of value[1].channels.cache) {
				if (v[1].type == "text") {
					let channel_id = v[1].id;
					let name = value[1].name + '/' + v[1].name
					let obj = {channel_id, name}
					res.push(obj);
				}
			}
		}
		return res;
	}

	public async getRoles(): Promise<any> {
		await readyBot();
		let res = []
		for await (const value of client.guilds.cache) {
			for await (const v of value[1].roles.cache) {
				let name = value[1].name + '/' + v[1].name
				let role_id = v[1].id
				let obj = {role_id, name}
				res.push(obj);
			}
		}
		return res;
	}

	public refreshToken(token: string): AxiosPromise<any> {
		const param = new URLSearchParams();
		param.append('client_id', process.env.DISCORD_CLIENT_ID);
		param.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
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