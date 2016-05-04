import {SessionServerData} from '../../blocks/api/data/api-data.module';
import {AuthService} from './auth.service';

export class AuthInterceptor {
  request: (req: any) => any;
  responseError: (res: any) => any;

  constructor($location: ng.ILocationService, $q: ng.IQService, AuthService: AuthService) {
    'ngInject';

    this.request = function(req: any) {
      const session: SessionServerData = AuthService.getSessionFromStorage();
      if (session) {
        if (!session.SessionHeader) {
          // delete session if old model
          AuthService.removeSessionFromStorage();
        } else {
          req.headers = req.headers || {};
          req.headers[session.SessionHeader.Name] = session.SessionHeader.Value;
        }
      }
      return req;
    };

    this.responseError = function responseError(res: any) {
      if (res.status === 401) {
        AuthService.removeSessionFromStorage();
        $location.path('/login');
        return res;
      }
      return $q.reject(res);
    };
  }
}

const config = ($httpProvider: ng.IHttpProvider) => {
  'ngInject';
  $httpProvider.interceptors.push('AuthInterceptor');
};

export default angular.module('blocks.auth.authInterceptor', [])
  .config(config)
  .service('AuthInterceptor', AuthInterceptor)
  .name;
