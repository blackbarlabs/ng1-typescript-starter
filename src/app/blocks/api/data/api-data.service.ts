/*
 * This file is a convenience to keep api import statements cleaner when consumed by app.
 */

import accountData, {AccountDataService} from './account-data.service';
import starterData, {StarterDataService} from './starter-data.service.ts';
import sessionData, {SessionDataService} from './session-data.service';
import userData, {UserDataService} from './user-data.service.ts';

export class ApiDataService {
  account: AccountDataService;
  starter: StarterDataService;
  session: SessionDataService;
  user: UserDataService;

  constructor(
    AccountDataService: AccountDataService,
    StarterDataService: StarterDataService,
    SessionDataService: SessionDataService,
    UserDataService: UserDataService
  ) {
    this.account = AccountDataService;
    this.starter = StarterDataService;
    this.session = SessionDataService;
    this.user = UserDataService;
  }
}

const dependencies = [accountData, starterData, sessionData, userData];

export default angular
  .module('api.dataService', dependencies)
  .service('apiData', ApiDataService)
  .name;
