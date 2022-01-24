import { Injectable } from '@nestjs/common';
import { IService } from './interfaces/service.interface';
import { Notion } from './entities/Notion/Notion.class';
import { Discord } from './entities/Discord/Discord.class';

let allServices: IService[] = [];
allServices.push(Notion);
allServices.push(Discord);


@Injectable()
export class ServicesService {
  getServices(): JSON {
	  return JSON.parse(JSON.stringify(allServices));
  }

  getServiceActions(id: string): JSON {
    return JSON.parse(JSON.stringify(allServices[parseInt(id) - 1].actions));
  }

  getServiceReactions(id: string): JSON {
    return JSON.parse(JSON.stringify(allServices[parseInt(id) - 1].reactions));
  }
}