import { Module } from "@nestjs/common";
import { ServicesController } from "./services.controller";
import { ServicesService } from "./services.service";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [ServicesController],
	providers: [ServicesService],
	exports: [ServicesService]
})
export class ServicesModule {}