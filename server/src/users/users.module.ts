import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import UserModel from 'src/models/User';

@Module({
  // imports: [MongooseModule.forFeature([{name : 'User', schema : UserModel}])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}