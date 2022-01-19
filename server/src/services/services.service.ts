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
    console.log(JSON.stringify(allServices[1]));
    console.log(process.env.NOTION);
	  return undefined;
  }
}