import { Body, Controller, Post, UseGuards, Request, Get, Param, Delete, Logger} from "@nestjs/common";
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
		return this.areaService.createArea(
			req.user.email,
			areaBody.name,
			areaBody.actionName,
			areaBody.reactionName,
			areaBody.actionData,
			areaBody.reactionData);
	}

	@Get(':name/enable')
	@ApiOperation({summary: 'Enable an area with name for logged in user'})
	@UseGuards(AuthGuard('jwt'))
	enableArea(@Request() req, @Param('name') name: string) {
		return this.areaService.enableAnArea(req.user.email, name);
	}

	@Get(':name/disable')
	@ApiOperation({summary: 'Disable an area with name for logged in user'})
	@UseGuards(AuthGuard('jwt'))
	disableArea(@Request() req, @Param('name') name: string) {
		return this.areaService.disableArea(req.user.email, name);
	}


	@Get()
	@ApiOperation({summary: 'Get logged in user areas'})
	@UseGuards(AuthGuard('jwt'))
	getAllAreas(@Request() req) {
		return this.areaService.getUserAreas(req.user.email)
	}

	@Get(':name')
	@ApiOperation({summary: 'Get an area information'})
	@UseGuards(AuthGuard('jwt'))
	getArea(@Request() req, @Param('name') name: string) {
		return this.areaService.getArea(req.user.email, name);
	}

	@Delete(':name')
	@ApiOperation({summary: 'Delete an area with name'})
	@UseGuards(AuthGuard('jwt'))
	deleteArea(@Request() req, @Param('name') name: string) {
		return this.areaService.deleteAnArea(req.user.email, name);
	}

	@Get('/:name/isEnabled')
	@ApiOperation({summary: "Checks if area is enabled"})
	@UseGuards(AuthGuard('jwt'))
	isEnabled(@Request() req, @Param('name') name: string) {
		return this.areaService.isEnabled(req.user.email, name);
	}
}