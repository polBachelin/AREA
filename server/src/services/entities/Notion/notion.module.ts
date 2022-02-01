import { Module } from "@nestjs/common";
import { NotionController } from "./notion.controller";
import { NotionService } from "./notion.service";

@Module({
	controllers: [NotionController],
	providers: [NotionService],
	exports: [NotionService]
})

export class NotionModule {}