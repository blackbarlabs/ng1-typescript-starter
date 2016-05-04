import 'restangular';
import guid from '../../guid/guid.module';
import exceptionHanlder from '../api-exception-handler/api-exception-handler.module';
import apiUtil from '../api-util/api-util.module.ts';
import dataService from './starter-base-data.service.ts';
import dataServiceConfig from './starter-base-data-service-config.provider.ts';

export {StarterBaseDataService} from './starter-base-data.service.ts';
export {StarterBaseDataServiceConfigProvider} from './starter-base-data-service-config.provider.ts';

export default angular
  .module('api.starterApiBase', ['restangular', guid, exceptionHanlder, apiUtil, dataService, dataServiceConfig])
  .name;
