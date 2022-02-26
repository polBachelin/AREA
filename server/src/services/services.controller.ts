import { Controller, Get, Param, Header, UseGuards, Query, Request } from '@nestjs/common';
import {ServicesService} from './services.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('services')
@Controller('/services')
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@Get()
	@ApiOperation({ summary: 'Get all services'})
	getServices(): JSON {
		return this.servicesService.getServices();
	}

	@Get(':id/actions')
	@ApiOperation( {summary: 'Get certain service actions'})
	getActions(@Param('id') id: string): JSON {
		return this.servicesService.getServiceActions(id);
	}

	@Get(':id/reactions')
	@ApiOperation( {summary: 'Get certain service reactions'})
	getReactions(@Param('id') id: string): JSON {
		return this.servicesService.getServiceReactions(id);
	}

	@Get('/logged')
	@ApiOperation({summary: 'Get all logged in services'})
	@UseGuards(AuthGuard('jwt'))
	getLoggedServices(@Request() req) {
		return this.servicesService.getLoggedInServices(req.user.email);	
	}
}
