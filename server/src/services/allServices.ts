import { IService } from './interfaces/service.interface';
import { Notion } from './entities/Notion/Notion.class';
import { Discord } from './entities/Discord/Discord.class';

export let allServices: IService[] = [];
allServices.push(Notion);
allServices.push(Discord);
