import {ApiUtil} from '../api-util/api-util.module.ts';
import dataServiceConfig, {StarterBaseDataServiceConfigProvider}
  from './starter-base-data-service-config.provider.ts';

export class StarterBaseDataService {
  apiBase: restangular.IService;

  constructor(StarterBaseDataServiceConfig: StarterBaseDataServiceConfigProvider,
              Restangular: restangular.IService, private ApiUtil: ApiUtil) {
    'ngInject';
    const { apiUrl, apiSuffix } = StarterBaseDataServiceConfig;
    if (!apiUrl) { throw new Error('StarterBaseDataService requires an apiUrl to be set.'); }

    this.apiBase = Restangular.withConfig((RestangularConfigurer: restangular.IProvider) => {
      RestangularConfigurer.setBaseUrl(apiUrl + apiSuffix);
      RestangularConfigurer.setRequestInterceptor((elem: restangular.IElement, operation: string) => {
        if (operation === 'remove') { return null; }
        return elem;
      });
    });
  }

  GET(path: string, query?: any, translate?: Function, isMultipart?: boolean): ng.IPromise<any[]> {
    const processServerResponse = isMultipart
      ? this.ApiUtil.returnMultipartResponseAsArray
      : this.ApiUtil.returnInputAsArray.bind(this.ApiUtil);

    return this.apiBase.all(path).customGET(null, query)
      .then(processServerResponse)
      .then(translateServerData);

    // the translate function's primary purpose is to normalize inconsistent server keys to keep UI more stable
    function translateServerData(data: any) { return data.map(translate); }
  }

  PUT(path: string, data: any, resourceId: string, isEncoded: boolean = false): ng.IPromise<any> {
    const httpConfig    = isEncoded ? { transformRequest: angular.identity } : {},
          customHeaders = isEncoded ? { 'Content-Type': undefined } : {};

    return this.apiBase.all(path)
      .withHttpConfig(httpConfig)
      .customPUT(data, resourceId, undefined, customHeaders);
  }

  POST(path: string, data: any, isEncoded: boolean = false): ng.IPromise<any> {
    const httpConfig    = isEncoded ? { transformRequest: angular.identity } : {},
          customHeaders = isEncoded ? { 'Content-Type': undefined } : {};

    return this.apiBase.all(path)
      .withHttpConfig(httpConfig)
      .customPOST(data, undefined, undefined, customHeaders);
  }

  DELETE(path: string, params: any): ng.IPromise<any> {
    const url = this.apiBase.all(path).getRestangularUrl();
    return this.ApiUtil.requestBuilder('DELETE', url, params, null, true);
  }
}

export default angular.module('api.starterBaseDataService', [dataServiceConfig])
  .service('StarterBaseDataService', StarterBaseDataService)
  .name;
