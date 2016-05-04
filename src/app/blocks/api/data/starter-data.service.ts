import {Guid} from '../../guid/guid.module.ts';
import StarterApiBase, {StarterBaseDataService} from '../starter-api-base/starter-api-base.module';

class StarterServerData {
  constructor(public Id: string) {
  }
}

export class StarterData {
  constructor(public id: string) {
  }
}

export interface IStarterDataService {
  fetch: (id: string, distributorId: string) => ng.IPromise<StarterData[]>;
  save: (id: string, distributorId: string, notes?: string, whenConfirmed?: Date) => ng.IPromise<StarterData>;
}

export interface IStarterDataQuery {
  id?: string;
  distributorId?: string;
}

export class StarterDataService implements IStarterDataService {
  private apiPath = 'Starter';

  constructor(private guid: Guid, private StarterBaseDataService: StarterBaseDataService) { 'ngInject'; }

  fetch(id: string, distributorId: string): ng.IPromise<StarterData[]> {
    let query = <IStarterDataQuery>{ id, distributorId };
    return this.StarterBaseDataService.GET(this.apiPath, query, this.createOneStarterData);
  }

  save(id: string, distributorId: string, notes?: string, whenConfirmed?: Date): ng.IPromise<StarterData> {
    const dataId     = this.guid.isGuidAndNotEmpty(id) ? id : this.guid.generate(),
          serverData = new StarterServerData(dataId),
          apiPromise = !id
            ? this.StarterBaseDataService.POST(this.apiPath, serverData)
            : this.StarterBaseDataService.PUT(this.apiPath, serverData, dataId);

    return apiPromise.then(() => this.createOneStarterData(serverData));
  }

  private createOneStarterData(data: StarterServerData): StarterData {
    return new StarterData(data.Id);
  }
}

export default angular
  .module('api.orderData', [StarterApiBase])
  .service('StarterDataService', StarterDataService)
  .name;
