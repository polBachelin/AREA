import { ATrigger } from "src/interfaces/trigger.interface";
import { IUser } from "src/models/User";
import axios, {AxiosRequestConfig} from 'axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

const INTRA_REFRESH_RATE = 10000

export class GPAChanges extends ATrigger {
    
    public setup(callback: () => Promise<void>, user: any): void {
        this.setChecking()
        this.intervalObj = setInterval(async () => {     
            Logger.log('is_checking');
            const link = user.intra.autologin;
            const gpa = user.intra.gpa;
            if (link) {
                let res = await axios.get(link+'/user/?format=json')
                if (!res) {
                    return new HttpException('Invalid autologin', HttpStatus.BAD_REQUEST);
                }
                const new_gpa = res.data.gpa[0].gpa;
                if (!this.isRunning() && (new_gpa && gpa && (new_gpa != gpa))) {
                    Logger.log("GPA CHANGE CALLBACK")
                    callback()
                    axios.post('localhost:8080/intra/change_gpa?email='+user.email+'&gpa='+new_gpa);
                    this.setRunning();
                    this.lastExec = new Date();
                }
            }
        }, INTRA_REFRESH_RATE)
        
    }
}