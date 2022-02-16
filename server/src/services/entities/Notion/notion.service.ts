import { Injectable, Logger } from "@nestjs/common";
import { AxiosRequestConfig } from "@nestjs/common/node_modules/axios";
import axios, { AxiosPromise } from "axios";
import type { GetUserResponse } from "@notionhq/client/build/src/api-endpoints"
import { INotion } from "src/models/Notion";
import { Model } from 'mongoose';
import { UsersService } from "src/users/users.service";
import { InjectModel } from '@nestjs/mongoose';
import { Client } from "@notionhq/client";	

type NotionPersonUser = Extract<GetUserResponse, { type: "person" }>

interface NotionOAuthToken {
	access_token: string
	token_type: "bearer"
	bot_id: string
	workspace_id: string
	workspace_name?: string
	workspace_icon?: string
	owner: { type: "workspace" } | { type: "user"; user: NotionPersonUser }
}

interface NotionStrategyOptions {
	clientID: string
	clientSecret: string
	callbackURL: string
	tokenURL?: string
	authorizationURL?: string
	state?: string
}

const notionClient: Client = new Client();
export {notionClient}

@Injectable()
export class NotionService {
	private notionStrategyOptions: NotionStrategyOptions = {
		clientID: "69156507-b2a0-46ac-aea9-afe5a4227b1f",
		clientSecret: "secret_1IESesqQSQeNlXId1QfsnZrzc2z6a35aFpkUIOLyrEe",
		callbackURL: "http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fnotion_callback",
	}
	//private notionClient: Client = new Client();

	constructor(
		@InjectModel('Notion') private notionModel: Model<INotion>,
		private userService: UsersService
	) {}

	public authorize(code: string): AxiosPromise<any> {
		const options: AxiosRequestConfig = {
			url: "https://api.notion.com/v1/oauth/token",
			method: "post",
			auth: {
			  username: this.notionStrategyOptions.clientID,
			  password: this.notionStrategyOptions.clientSecret,
			},
			data: {
			  grant_type: "authorization_code",
			  code: code,
			},
			headers: { "Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*" },
		};
		return axios(options)
	}

	public setNotionToken(email: string, notionToken: Object) {
    	this.userService.findOne(email).then(res => {
			const userNotion = new this.notionModel(notionToken);
			res.notion = userNotion;
			res.save();
			return this.userService.sanitizeUser(res);
		}).catch(err => {
			console.log("SetNotionTOken == ", err);
		});
	}

	async getNotionToken(email: string) {
		const user = await this.userService.findOne(email);
		return user.notion;
	}


	public async getDatabases(email: string) {
		let token = await this.getNotionToken(email)
		return notionClient.search({auth: token.access_token, filter: {
			property: "object",
			value: "database"
		}})
	}

	public async getAllDatabaseTitles(email: string) {
		let token = await this.getNotionToken(email)
		let dbs = await this.getDatabases(email);
		let ret: Array<string> = [];
		for (let key in dbs.results) {
			let t = await this.getADatabase(token, dbs.results[key].id)
			ret.push(t.title[0].plain_text);
		}
		return ret
	}

	public async getADatabase(token, database: string) {
		return notionClient.databases.retrieve({auth: token.access_token, database_id: database})
	}
}