import { Controller, Get, Param, Header } from '@nestjs/common';
import {ServicesService} from './services.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags} from '@nestjs/swagger';

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
}
