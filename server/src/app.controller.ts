import { Controller, Get, UseGuards, Post, Request, Res, Req, Logger} from '@nestjs/common';
import { RealIp } from 'nestjs-real-ip';
import { AppService } from './app.service';


@Controller('/')
export class AppController {
    constructor(private readonly appService: AppService) {}
    
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
    
    @Get('/about.json')
    About(@Req() req, @Res() res) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const about = {
            client: {
                host: ip
            },
            server: {
                current_time: new Date().getTime(),
                services: [{
                    name: "Epitech's intranet",
                    actions: [{
                        name: "GPA changes",
                        description: "Trigger when the user's GPA change"
                    }, {
                        name: "New notification",
                        description: "Trigger when the user get a new notification"
                    }],
                    reaction: []
                }, {
                    name: "Notion",
                    actions: [{
                        name: "Database changes",
                        description: "Trigger when the selected database change"
                    }],
                    reaction: [{
                        name: "Create page",
                        description: "Create a new page inside the selected database"
                    }]
                }, {
                    name: "Google Calendar",
                    actions: [],
                    reaction: [{
                        name: "Create event",
                        description: "Create an event in the user calendar"
                    }]
                }, {
                    name: "Discord",
                    actions: [{
                        name: "Receive message",
                        description: "Trigger when a message is receive in the selected channel"
                    }],
                    reaction: [{
                        name: "Send message",
                        description: "Send a message on a selected channel"
                    }, {
                        name: "Rename channel",
                        description: "Rename a selected channel"
                    }, {
                        name: "Add role",
                        description: "Add a role to a channel"
                    }, {
                        name: "Remove role",
                        description: "Remove a role of a channel"
                    }]                  
                }, {
                    name: "Weather",
                    actions: [{
                        name: "Weather change",
                        description: "Trigger when the weather of a selected city change"
                    }],
                    reaction: []
                }, {
                    name: "Timer",
                    actions: [{
                        name: "Start timer",
                        description: "Trigger when the timer end after a selected time"
                    }],
                    reaction: []
                }]
            }
        };
        res.send(about);
    } 
}