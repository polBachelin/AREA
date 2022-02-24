import { forwardRef, Module } from "@nestjs/common";
import { GoogleCalendarService } from "./googleCalendar.service";
import { GoogleCalendarController } from "./googleCalendar.controller";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { oauthToken } from "src/models/OauthToken";

@Module({
	imports: [MongooseModule.forFeature([{name: 'Google', schema: oauthToken}]), forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
	controllers: [GoogleCalendarController],
	providers: [GoogleCalendarService],
	exports: [GoogleCalendarService]
})

export class GoogleCalendarModule {}