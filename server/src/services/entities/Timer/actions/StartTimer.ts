import { ATrigger } from "src/interfaces/trigger.interface";
import { IUser } from "src/models/User";
import axios, {AxiosRequestConfig} from 'axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

const TIMER_REFRESH_RATE = 1000

export class StartTimer extends ATrigger {

    public save() {
        this.lastExec = new Date()
        this.lastExec.setTime(this.lastExec.getTime() + (this.data.get('time_s') * 1000))
    }

    public setup(callback: () => Promise<void>, user: IUser): void {
        const delay = this.data.get('time_s')
        this.setChecking();
        this.intervalObj = setInterval(async () => {
        if (!this.lastExec)
            this.save();
        const act = new Date()
        if (this.lastExec.getTime() <= act.getTime()) {
            Logger.log("TRIGGER TIMER CALLBACK")
            this.setRunning();
            callback()
            this.save();
        }
            
        }, TIMER_REFRESH_RATE)
    }
}