import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "@nestjs/common/node_modules/axios";
import axios from "axios";
import NotionStrategy, { NotionStrategyOptions } from "./notion.strategy";

@Injectable()
export class NotionService {
	public notion: NotionStrategy;
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
			console.log(res);
		}).catch((err) => {
			console.log('error ', err);
		})
	}
}