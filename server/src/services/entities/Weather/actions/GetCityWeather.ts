import { ATrigger } from "src/interfaces/trigger.interface";
import { IUser } from "src/models/User";
import axios, {AxiosRequestConfig} from 'axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { properties } from "src/interfaces/task.interface";

const WEATHER_URL = "api.openweathermap.org/data/2.5/weather?q="
const API_KEY = "&appid=899c451b2f906345aeab6458c2febc9d"
const WEATHER_REFRESH_RATE = 10000

export class WeatherChange extends ATrigger {

    public async getWeather(city_name: String) {
        const api_url = WEATHER_URL + city_name + API_KEY;
        let res = await axios.get(api_url);
        if (!res) {
            return new HttpException('Invalid autologin', HttpStatus.BAD_REQUEST);
        }
        return res.data.weather[0].main;
    }

    public setup(callback: () => Promise<void>, user: IUser): void {
        const city_name = this.data.get('city_name');
        const api_url = WEATHER_URL + city_name + API_KEY;
        let old_weather = this.getWeather(city_name);
        this.setChecking();
        this.intervalObj = setInterval(async () => {
            Logger.log('Wheather is checking');
            const new_weather = await this.getWeather(city_name);
            if (!this.isRunning() && (old_weather != new_weather)) {
                Logger.log("Weather CALLBACK");
                this.setRunning();
                callback();
                this.lastExec = new Date();
                old_weather = new_weather;
            }
        })
    }
}