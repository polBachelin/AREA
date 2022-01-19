import { Controller, Get, Param } from '@nestjs/common';
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
	@ApiOperation( {summary: 'Get certain service'})
	getActions(@Param('id') id: string): string {
		return 'The service id is ' + id;
	}

	@Get(':id/reactions')
	@ApiOperation( {summary: 'Get certain service'})
	getReactions(@Param('id') id: string): string {
		return 'The service id is ' + id;
	}
}
