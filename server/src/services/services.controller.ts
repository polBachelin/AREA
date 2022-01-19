import { Controller, Get, Param } from '@nestjs/common';
import {ServicesService} from './services.service';

@Controller('/services')
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@Get()
	getServices(): JSON {
		return this.servicesService.getServices();
	}

	@Get(':id/actions')
	findOne(@Param('id') id: string): string {
		return 'The service id is #${id}';
	}
}
