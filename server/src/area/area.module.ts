import { Module } from "@nestjs/common";
import { areaSchema } from "src/models/Area";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [MongooseModule.forFeature([{name:'Area', schema: areaSchema}]), UsersModule],
	controllers: [AreaController],
	providers: [AreaService],
	exports: [AreaService]
})

export class AreaModule {}