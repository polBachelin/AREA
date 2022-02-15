import { Body, Controller, Post, UseGuards, Request} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AreaService } from "./area.service";
import {AreaDTO} from './area.dto' 
import { AuthGuard } from "@nestjs/passport";

@ApiTags('area')
@Controller('/area')
export class AreaController {
	constructor(private areaService: AreaService) {}

	@Post('/create')
	@ApiOperation({ summary: 'Create an area'})
	@UseGuards(AuthGuard('jwt'))
	createArea(@Request() req, @Body() areaBody: AreaDTO) {
		this.areaService.createArea(
			req.user.email,
			areaBody.name,
			areaBody.actionName,
			areaBody.reactionName,
			areaBody.actionData,
			areaBody.reactionData);
	}
}