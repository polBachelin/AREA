import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { discordSchema } from "src/models/Discord";
import { UsersModule } from "src/users/users.module";
import { DiscordController } from "./discord.controller";
import { DiscordService } from "./discord.service";

@Module({
	imports: [MongooseModule.forFeature([{name:'Discord', schema: discordSchema}]), forwardRef(() => UsersModule), forwardRef(() => AuthModule)],
	controllers: [DiscordController],
	providers: [DiscordService],
	exports: [DiscordService]
})

export class DiscordModule {}