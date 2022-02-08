import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AreaService } from "./area.service";

@ApiTags('area')
@Controller('/area')
export class AreaController {
	constructor(private areaService: AreaService) {}
}