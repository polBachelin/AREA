import { Module } from "@nestjs/common";
import { ServicesController } from "./services.controller";
import { ServicesService } from "./services.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [ConfigModule.forRoot(), UsersModule],
	controllers: [ServicesController],
	providers: [ServicesService],
	exports: [ServicesService]
})
export class ServicesModule {}