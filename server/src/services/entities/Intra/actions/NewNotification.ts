import { ATrigger } from "src/interfaces/trigger.interface";
import { IUser } from "src/models/User";
import axios, {AxiosRequestConfig} from 'axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

const INTRA_REFRESH_RATE = 10000

export class NewNotification extends ATrigger {

    public setup(callback: () => Promise<void>, user: any): void {
        this.setChecking();
        this.intervalObj = setInterval(async () => {
            Logger.log("NEW NOTIF IS CHECKING")
            const link = user.intra.autologin;
            const user_notif: Date = user.intra.last_notif;
            if (link) {
                let res = await axios.get(link+'/user/notification/message?format=json')
                if (!res)
                    return new HttpException('Invalid autologin', HttpStatus.BAD_REQUEST)
                const last_notif = res.data[0].date;
                let date = new Date(last_notif);
                if (!this.isRunning() && (date.getTime() !== user_notif.getTime())) {
                    Logger.log("New notification callback")
                    callback()
                    axios.post('localhost:8080/intra/change_lnotif?email='+user.email+'&last_notif='+date.getTime());
                    this.setRunning();
                    this.lastExec = new Date();
                }
            }
        }, INTRA_REFRESH_RATE)
    }

}