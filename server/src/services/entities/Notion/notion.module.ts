import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { NotionController } from "./notion.controller";
import { NotionService } from "./notion.service";
import { forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { notionSchema } from "src/models/Notion";

@Module({
	imports: [MongooseModule.forFeature([{name:'Notion', schema: notionSchema}]), forwardRef(() => UsersModule), forwardRef(() => AuthModule)],
	controllers: [NotionController],
	providers: [NotionService],
	exports: [NotionService]
})

export class NotionModule {}