import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { oauthToken } from "src/models/OauthToken";
import { UsersModule } from "src/users/users.module";
import { DiscordController } from "./discord.controller";
import { DiscordService } from "./discord.service";

@Module({
	imports: [MongooseModule.forFeature([{name:'Discord', schema: oauthToken}]), forwardRef(() => UsersModule), forwardRef(() => AuthModule)],
	controllers: [DiscordController],
	providers: [DiscordService],
	exports: [DiscordService]
})

export class DiscordModule {}