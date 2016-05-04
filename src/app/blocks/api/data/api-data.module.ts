import apiDataService from './api-data.service';

export {ApiDataService} from './api-data.service';
export {AccountDataService, AccountData} from './account-data.service';
export {StarterDataService, StarterData} from './starter-data.service.ts';
export {
  SessionDataService,
  SessionServerData,
  SessionMethod,
  IDecodedSessionHeaderValue
} from './session-data.service';
export {UserDataService, UserData} from './user-data.service';

export default angular
  .module('api.data', [apiDataService])
  .name;
