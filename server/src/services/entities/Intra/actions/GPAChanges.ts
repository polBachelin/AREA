import { ATrigger } from "src/interfaces/trigger.interface";
import { IUser } from "src/models/User";
import axios, {AxiosRequestConfig} from 'axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

const INTRA_REFRESH_RATE = 60000

export class GPAChanges extends ATrigger {
    
    public setup(callback: () => Promise<void>, user: any): void {
        this.setChecking()
        this.intervalObj = setInterval(async () => {            
            const link = user.intra.autologin;
            const gpa = user.intra.gpa;
            let res = await axios.get(link+'/user/?format=json')
            if (!res) {
                return new HttpException('Invalid autologin', HttpStatus.BAD_REQUEST);
            }
            const new_gpa = res.data.gpa[0].gpa;
            if (!this.isRunning() && (new_gpa && gpa && (new_gpa != gpa))) {
                callback()
                this.setRunning();
                this.lastExec = new Date();
            }
        }, INTRA_REFRESH_RATE)
        
    }
}