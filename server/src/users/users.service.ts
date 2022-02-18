import { Injectable, Logger } from '@nestjs/common';
import { RegisterDTO } from './register.dto';
import { IUser, userSchema } from 'src/models/User';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpStatus, HttpException } from '@nestjs/common';
import { LoginDTO } from 'src/auth/login.dto';
import { AreaDTO } from 'src/area/area.dto';

// This should be a real class/interface representing a user entity
export type User = any;


@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
  ) {}

  async createUser(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = new this.userModel(RegisterDTO);
    await newUser.save();
	  return this.sanitizeUser(newUser);
  }

  sanitizeUser(user: User) {
    const sanitized = user;
    delete sanitized['password'];
    return sanitized;
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }

  async findArea(user: any, areaName: string): Promise<User | undefined> {
    return await user.areas.find(element => element.name == areaName);
  }

  async removeArea(email: string, areaName: string) {
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User doesnt exist', HttpStatus.BAD_REQUEST);
    }
    if (user['password'] === UserDTO.password) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  getCursor() {
    return this.userModel.find().cursor();
  }
  getallUsers() {
    return this.userModel.find();
  }
}
