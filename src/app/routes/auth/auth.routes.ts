import * as _ from 'lodash';
import core from '../../core/core.module';
import {IAuthActions} from '../../core/store/auth/auth.actions';
import authService, {AuthService} from './auth.service';
import {SessionMethod} from '../../blocks/api/data/api-data.module';

const logoutUrl = '/logout';

function appRun(routerHelper: any, authActions: IAuthActions) {
  'ngInject';
  routerHelper.configureStates(getStates());
  // check session storage and gather user info if saved
  authActions.bootstrap();
}

function addStateAuthentication($rootScope: ng.IRootScopeService, $state: ng.ui.IStateService,
                                authActions: IAuthActions, AuthService: AuthService, $location: ng.ILocationService) {
  'ngInject';
  const removeChangeWatcher: any = $rootScope.$on('$stateChangeStart', (event: any, toState: any) => {
    // carry on if user is authenticated
    if (authActions.isAuthenticated()) { return; }

    // attempt to login user if credentials present in url
    const credentials = AuthService.getCredentialsFromLocationSearch($location.search());
    if (!_.isEmpty(credentials)) {
      event.preventDefault();
      const toUrl = AuthService.urlWithoutCredentials($location.path(), $location.search());
      return authActions.login(credentials.userId, credentials.token, toUrl, SessionMethod.Voucher)
        .catch(() => $state.transitionTo('login'));
    }

    // redirect to login if state requires authentication
    if (toState.authenticate) {
      event.preventDefault();
      return $state.transitionTo('login');
    }
  });
  $rootScope.$on('$destroy', removeChangeWatcher);
}

function addUrlLogin($rootScope: ng.IRootScopeService, $state: ng.ui.IStateService, AuthService: AuthService,
                     $location: ng.ILocationService) {
  'ngInject';
  const removeSuccessWatcher: any = $rootScope.$on('$stateChangeSuccess', (event: any, toState: any, toParams: any) => {
    // if credentials for url login are in url then strip them and replace the url string
    const credentials = AuthService.getCredentialsFromLocationSearch($location.search());
    if (!_.isEmpty(credentials)) {
      event.preventDefault();
      return $state.go(toState.name, toParams, { location: 'replace', notify: false });
    }
  });
  $rootScope.$on('$destroy', removeSuccessWatcher);
}

function restrictSuperAdminPortal($rootScope: ng.IRootScopeService, $state: ng.ui.IStateService,
                                  authActions: IAuthActions) {
  'ngInject';
  const removeChangeWatcher: any = $rootScope.$on('$stateChangeStart', (event: any, toState: any, toParams: any,
                                                                        fromState: any, fromParams: any) => {
    // if not site admin, do not allow entry into superadmin portal
    if (/superadmin/.test(toState.name.toLowerCase()) && !authActions.isSiteAdmin()) {
      event.preventDefault();
      return $state.go(fromState.name || 'home', fromParams);
    }
  });
  $rootScope.$on('$destroy', removeChangeWatcher);
}

function getStates() {
  return [
    {
      state: 'login',
      config: {
        url: '/login',
        title: 'login',
        template: '<login destination-url="$ctrl.destinationUrl"></login>',
        controller: function(destinationUrl: string) {
          'ngInject';
          this.destinationUrl = destinationUrl;
        },
        controllerAs: '$ctrl',
        params: {
          ignoreToUrl: false
        },
        resolve: {
          destinationUrl: function($location: ng.ILocationService, $stateParams: any) {
            'ngInject';
            return ($location.url().match(/login/) || $stateParams.ignoreToUrl ? '/' : $location.url());
          }
        }
      }
    },
    {
      state: 'logout',
      config: {
        url: logoutUrl,
        title: 'logout',
        template: '<div></div>',
        controller: (authActions: IAuthActions) => {
          'ngInject';
          authActions.logout();
        }
      }
    }
  ];
}

export default angular.module('auth.routes', [authService, core])
  .run(appRun)
  .run(addStateAuthentication)
  .run(addUrlLogin)
  .run(restrictSuperAdminPortal)
  .name;
