import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AreaModule } from './area/area.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { FrontendMiddleware } from './middlewares/frontend.middleware';
import { NotionModule } from 'src/services/entities/Notion/notion.module';
import { DiscordModule } from 'src/services/entities/Discord/discord.module';
import { IntraModule } from 'src/services/entities/Intra/intra.module';
import { GoogleCalendarModule } from 'src/services/entities/GoogleCalendar/googleCalendar.module';
import * as dotenv from "dotenv";

dotenv.config({path: `../.env`});
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, MongooseModule.forRoot(process.env.DB_URL), ServicesModule, AreaModule,
    NotionModule, DiscordModule, IntraModule, GoogleCalendarModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {
  // configure(frontEnd: MiddlewareConsumer) {
  //   frontEnd.apply(FrontendMiddleware).forRoutes({
  //     path: '/*/auth',
  //     method: RequestMethod.ALL,
  //   });
  // }
}
