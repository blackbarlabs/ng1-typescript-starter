import {ApiExceptionMessage} from './api-exception-message.model.ts';

export class ExceptionMessageInterceptor {
  requestError: (rejection: any) => any;
  responseError: (rejection: any) => any;

  constructor($q: ng.IQService) {
    'ngInject';

    this.requestError = function requestError(req: any) {
      return $q.reject(new ApiExceptionMessage(req));
    };

    this.responseError = function responseError(res: any) {
      if (res.status === 404) {
        res.data = [];
        return res;
      }
      return $q.reject(new ApiExceptionMessage(res));
    };
  }

  request(config: ng.IRequestConfig) {
    return config;
  }

  response(res: any) {
    return res;
  }
}

export default angular
  .module('api.exceptionMessageInterceptor', [])
  .service('ExceptionMessageInterceptor', ExceptionMessageInterceptor)
  .name;
