import { Injectable } from '@nestjs/common';
import { IUser } from 'src/models/User';
import { UsersService } from '../users/users.service';
import { allServices } from './allServices';

const serviceName = [
  "notion", "discord", "intra", "google", "github", "timer", "weather"
]

@Injectable()
export class ServicesService {

  constructor(private userService: UsersService) {}

  getServices(): JSON {
	  return JSON.parse(JSON.stringify(allServices));
  }

  getServiceActions(id: string): JSON {
    return JSON.parse(JSON.stringify(allServices[parseInt(id) - 1].actions));
  }

  getServiceReactions(id: string): JSON {
    return JSON.parse(JSON.stringify(allServices[parseInt(id) - 1].reactions));
  }

  async getLoggedInServices(email: string) {
    let user: IUser = await this.userService.findOne(email);
    let connected: Array<string> = [];

    connected.push('timer');
    connected.push('weather');
    if (!user) return undefined;
    for (let name in serviceName) {
      if (await this.userService.getSpecificService(serviceName[name], email)) {
        connected.push(serviceName[name]);
      }
    }
    return connected;
  }
}