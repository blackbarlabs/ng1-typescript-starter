import exceptionInterceptor from './exception-message.interceptor.ts';

const config = ($httpProvider: ng.IHttpProvider) => {
  'ngInject';
  $httpProvider.interceptors.push('ExceptionMessageInterceptor');
};

export default angular
  .module('api.exceptionHandler', [exceptionInterceptor])
  .config(config)
  .name;
