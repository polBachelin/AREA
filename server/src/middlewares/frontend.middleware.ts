import { NestMiddleware, Injectable } from "@nestjs/common";
import {Request, Response} from "express"
import { resolve } from "path/posix";

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: Function) {
		res.redirect('http://localhost:8080');
	}
}