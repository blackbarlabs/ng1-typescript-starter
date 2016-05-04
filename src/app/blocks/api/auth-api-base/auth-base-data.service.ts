import dataServiceConfig, {AuthBaseDataServiceConfigProvider} from './auth-base-data-service-config.provider';

export class AuthBaseDataService {
  apiBase: restangular.IService;

  constructor(AuthBaseDataServiceConfig: AuthBaseDataServiceConfigProvider, Restangular: restangular.IService) {
    'ngInject';
    const { apiUrl, apiSuffix } = AuthBaseDataServiceConfig;
    if (!apiUrl) { throw new Error('AuthBaseDataService requires an apiUrl to be set.'); }

    this.apiBase = Restangular.withConfig((RestangularConfigurer: restangular.IProvider) => {
      RestangularConfigurer.setBaseUrl(apiUrl + apiSuffix);
      RestangularConfigurer.setRequestInterceptor((elem: restangular.IElement, operation: string) => {
        if (operation === 'remove') { return null; }
        return elem;
      });
    });
  }

  POST(path: string, data: any): ng.IPromise<any> {
    return this.apiBase.all(path)
      .post(data)
      .then((res: any) => res.plain());
  }
}

export default angular
  .module('api.authBaseDataService', [dataServiceConfig])
  .service('AuthBaseDataService', AuthBaseDataService)
  .name;
