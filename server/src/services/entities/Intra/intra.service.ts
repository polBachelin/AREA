import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, {AxiosRequestConfig} from 'axios';
import { Model } from 'mongoose'
import { AuthService } from 'src/auth/auth.service';
import { IIntra } from 'src/models/Intra';
import { RegisterDTO } from 'src/users/register.dto';
import { UsersService } from 'src/users/users.service';

export const INTRA_URL = "https://intra.epitech.eu/"

@Injectable()
export class IntraService {
    constructor(
        @InjectModel('Intra') private intraModel: Model<IIntra>,
        private userService: UsersService,
        private authService: AuthService
    ) {}

    public async getUserProfile(link: string) {
        let res = await axios.get(link+'/user/?format=json')
        return res.data
    }

    public async getUserGPA(link: string) {
        let res = await axios.get(link+'/user/?format=json')
        if (!res) {
            return new HttpException('Invalid autologin', HttpStatus.BAD_REQUEST);
        }
        return res.data.gpa[0].gpa;
    }

    public setIntraLink(email: string, info: Object) {
        this.userService.findOne(email).then(res => {
            const userIntra = new this.intraModel(info);
            res.intra = userIntra;
            res.save();
            return this.userService.sanitizeUser(res);
        });
    }

    public async LoginWithIntra(email: string, info: Object) {
        if (email) {
            let user = await this.userService.findOne(email);
            if (!user) {
                let RegisterDTO: RegisterDTO;
                RegisterDTO = {email:email, password:""};
                user = await this.userService.createUser(RegisterDTO);
            }
            this.setIntraLink(email, info);
            const token = await this.authService.signUser(user);
            return {token:token};
        }
    }
}
