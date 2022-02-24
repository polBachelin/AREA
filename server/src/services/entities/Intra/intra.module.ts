import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { intraSchema } from 'src/models/Intra';
import { UsersModule } from 'src/users/users.module';
import { IntraController } from './intra.controller';
import { IntraService } from './intra.service';

@Module({
  imports: [MongooseModule.forFeature([{name:'Intra', schema:intraSchema}]), forwardRef(() => UsersModule), forwardRef(() => AuthModule)],
  controllers: [IntraController],
  providers: [IntraService]
})
export class IntraModule {}
