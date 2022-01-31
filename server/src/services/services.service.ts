import { Injectable } from '@nestjs/common';
import { allServices } from './allServices';

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