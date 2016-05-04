import {Guid} from '../../guid/guid.module.ts';
import starterApiBase, {StarterBaseDataService} from '../starter-api-base/starter-api-base.module';

class UserServerData {
  constructor(public id: string,
              public account_id: string,
              public company: string,
              public buyerName: string,
              public email: string,
              public phone: string,
              public address: string,
              public city: string,
              public state: string,
              public zip: string,
              public isTestUser: boolean) {
  }
}

export class UserData {
  constructor(public id: string,
              public accountId: string,
              public company: string,
              public buyerName: string,
              public email: string,
              public phone: string,
              public address: string,
              public city: string,
              public state: string,
              public  zip: string,
              public isTestUser: boolean) {
  }
}

export interface IUserDataQuery {
  id?: string;
  accountId?: string;
}

export interface IUserDataService {
  fetch: (id?: string, accountId?: string) => ng.IPromise<UserData[]>;
  save: (id: string, account: string, company: string, buyerName: string, email: string,
         phone: string, address: string, city: string, state: string, zip: string,
         dateLastEmailSent: Date, isTestUser: boolean) => ng.IPromise<UserData>;
  remove: (id: string) => ng.IPromise<any>;
}

export class UserDataService implements IUserDataService {
  private apiPath = 'User';

  constructor(private StarterBaseDataService: StarterBaseDataService, private guid: Guid) { 'ngInject'; }

  fetch(id?: string, accountId?: string): ng.IPromise<UserData[]> {
    const query: IUserDataQuery = { id, accountId };
    return this.StarterBaseDataService.GET(this.apiPath, query, this.createOneUserData);
  }

  save(id: string, accountId: string, company: string, buyer: string, email: string,
       phone: string, address: string, city: string, state: string, zip: string,
       dateWelcomeEmailSent: Date, isTestUser: boolean): ng.IPromise<UserData> {
    const dataId     = this.guid.isGuidAndNotEmpty(id) ? id : this.guid.generate(),
          serverData = new UserServerData(dataId, accountId, company, buyer, email, phone, address, city,
                                          state, zip, isTestUser),
          apiPromise = !id
            ? this.StarterBaseDataService.POST(this.apiPath, serverData)
            : this.StarterBaseDataService.PUT(this.apiPath, serverData, dataId);
    return apiPromise.then(() => this.createOneUserData(serverData));
  }

  remove(id: string): ng.IPromise<any> {
    const params: IUserDataQuery = { id };
    return this.StarterBaseDataService.DELETE(this.apiPath, params);
  }

  private createOneUserData(data: UserServerData): UserData {
    return new UserData(data.id, data.account_id, data.company, data.buyerName, data.email, data.phone, data.address,
                        data.city, data.state, data.zip, data.isTestUser);
  }
}

export default angular
  .module('api.userData', [starterApiBase])
  .service('UserDataService', UserDataService)
  .name;
