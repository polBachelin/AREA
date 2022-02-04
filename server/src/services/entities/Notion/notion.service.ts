import { Injectable, Logger } from "@nestjs/common";
import { AxiosRequestConfig } from "@nestjs/common/node_modules/axios";
import axios, { AxiosPromise } from "axios";
import type { GetUserResponse } from "@notionhq/client/build/src/api-endpoints"
import { INotion } from "src/models/Notion";
import { Model } from 'mongoose';
import { UsersService } from "src/users/users.service";
import { InjectModel } from '@nestjs/mongoose';

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

@Injectable()
export class NotionService {
	private notionStrategyOptions: NotionStrategyOptions = {
		clientID: "69156507-b2a0-46ac-aea9-afe5a4227b1f",
		clientSecret: "secret_1IESesqQSQeNlXId1QfsnZrzc2z6a35aFpkUIOLyrEe",
		callbackURL: "http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fnotion_callback",
	}
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

	async setNotionToken(email: string, notionToken: Object) {
    	const user = await this.userService.findOne(email);
    	const userNotion = new this.notionModel(notionToken);
    	user.notion = userNotion;
		user.save();
		return this.userService.sanitizeUser(user);
  }

  async getNotionToken(email: string) {
	  const user = await this.userService.findOne(email);
	  return user.notion;
  }
}