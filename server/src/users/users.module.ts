import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../models/User';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{name:'User', schema: userSchema}])],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService]
})
export class UsersModule {}