import 'restangular';
import guid from '../../../blocks/guid/guid.module';
import exceptionHandler from '../api-exception-handler/api-exception-handler.module';
import apiUtil from '../api-util/api-util.module.ts';
import dataService from './auth-base-data.service';
import dataServiceConfig from './auth-base-data-service-config.provider.ts';

export {AuthBaseDataService} from './auth-base-data.service';
export {AuthBaseDataServiceConfigProvider} from './auth-base-data-service-config.provider.ts';

export default angular
  .module('api.authApiBase', ['restangular', guid, exceptionHandler, apiUtil, dataService, dataServiceConfig])
  .name
