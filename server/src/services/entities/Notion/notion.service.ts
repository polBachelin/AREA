import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "@nestjs/common/node_modules/axios";
import axios from "axios";
import type { GetUserResponse } from "@notionhq/client/build/src/api-endpoints"

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
	constructor() {}

	public authorize(code: string) {
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
		axios(options).then((res) => {
			return res.data;
		}).catch((err) => {
			//TODO CATCH ERRORS
			console.log('error ', err);
		})
	}
}