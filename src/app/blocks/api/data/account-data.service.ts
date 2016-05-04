import {Guid} from '../../guid/guid.module.ts';
import starterApiBase, {StarterBaseDataService} from '../starter-api-base/starter-api-base.module';
import {ApiUtil} from '../api-util/api-util.module.ts';

class AccountServerData {
  constructor(public id: string,
              public username?: string,
              public password?: string,
              public site_admin_token?: string) {
  }
}

export class AccountData {
  constructor(public id: string,
              public username?: string,
              public password?: string,
              public siteAdminToken?: string) {
  }
}

export interface IAccountDataQuery {
  id: string;
}

export interface IAccountDataService {
  fetch: (id: string) => ng.IPromise<AccountData[]>;
  save: (id: string, username: string, password: string, siteAdminToken: string) => ng.IPromise<AccountData>;
}

export class AccountDataService implements IAccountDataService {
  private apiBase = 'Account';

  constructor(private guid: Guid, private ApiUtil: ApiUtil,
              private StarterBaseDataService: StarterBaseDataService) { 'ngInject'; }

  fetch(id: string): ng.IPromise<AccountData[]> {
    const query: IAccountDataQuery = { id };
    return this.StarterBaseDataService.GET(this.apiBase, query, this.createOneAccountData);
  }

  save(id: string, username: string, password: string, siteAdminToken: string): ng.IPromise<AccountData> {
    let dataId     = this.guid.isGuidAndNotEmpty(id) ? id : this.guid.generate(),
        serverData = this.ApiUtil.compactObject(new AccountServerData(dataId, username, password, siteAdminToken)),
        apiPromise = !id
          ? this.StarterBaseDataService.POST(this.apiBase, serverData)
          : this.StarterBaseDataService.PUT(this.apiBase, serverData, dataId);

    return apiPromise.then(() => this.ApiUtil.compactObject(this.createOneAccountData(serverData)));
  }

  private createOneAccountData(data: AccountServerData): AccountData {
    return new AccountData(data.id, data.username, data.password);
  }
}

export default angular
  .module('api.accountData', [starterApiBase])
  .service('AccountDataService', AccountDataService)
  .name;
