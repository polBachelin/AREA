import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/models/User';

@Module({
  imports: [MongooseModule.forFeature([{name:'User', schema: userSchema}])],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService]
})
export class UsersModule {}