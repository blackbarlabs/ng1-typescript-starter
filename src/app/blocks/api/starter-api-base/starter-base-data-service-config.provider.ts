export class StarterBaseDataServiceConfigProvider implements ng.IServiceProvider {
  apiUrl: string = undefined;
  apiSuffix: string = undefined;

  $get = () => this;

  configure(apiUrl: string, apiSuffix: string) {
    this.apiUrl = apiUrl;
    this.apiSuffix = apiSuffix;
  }
}

export default angular.module('api.starterBaseDataServiceConfig', [])
  .provider('StarterBaseDataServiceConfig', StarterBaseDataServiceConfigProvider)
  .name;
