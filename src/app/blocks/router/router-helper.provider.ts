/**
 * Initial module created by John Papa at: https://github.com/johnpapa/generator-hottowel
 */

import logger, {Logger} from '../logger/logger.module';
import 'angular-ui-router';

interface IAppRootScope extends ng.IRootScopeService {
  title: string;
}

export class RouterHelperProvider implements ng.IServiceProvider {
  configure: any;
  $get: any;

  constructor($locationProvider: ng.ILocationProvider, $stateProvider: ng.ui.IStateProvider,
              $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    'ngInject';

    let config = {
      docTitle: undefined,
      resolveAlways: {}
    };

    $locationProvider.html5Mode(true);

    this.configure = function(cfg: any) {
      angular.extend(config, cfg);
    };

    this.$get = RouterHelper;
    RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger'];
    function RouterHelper($location: ng.ILocationService, $rootScope: IAppRootScope,
                          $state: ng.ui.IStateService, logger: Logger) {
      let handlingStateChangeError = false;
      let hasOtherwise = false;
      let stateCounts = {
        errors: 0,
        changes: 0
      };

      const service = {
        configureStates,
        getStates,
        stateCounts
      };

      init();

      return service;

      ///////////////

      function configureStates(states: any, otherwisePath: string) {
        states.forEach(function(state: any) {
          state.config.resolve =
            angular.extend(state.config.resolve || {}, config.resolveAlways);
          $stateProvider.state(state.state, state.config);
        });
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }

      function handleRoutingErrors() {
        // route cancellation:
        // on routing error, go to the dashboard.
        // provide an exit clause if it tries to do it twice.
        const removeErrorWatcher = $rootScope.$on('$stateChangeError', handleError);

        function handleError(event: any, toState: any, toParams: any, fromState: any, fromParams: any, error: any) {
          if (handlingStateChangeError) {
            return;
          }
          stateCounts.errors++;
          handlingStateChangeError = true;
          let destination = (toState &&
            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
            'unknown target';
          let msg = 'Error routing to ' + destination + '. ' +
            (error.data || '') + '. <br/>' + (error.statusText || '') +
            ': ' + (error.status || '');
          logger.warning(msg, [toState]);
          $location.path('/');
        }

        $rootScope.$on('$destroy', () => removeErrorWatcher());
      }

      function init() {
        handleRoutingErrors();
        updateDocTitle();
      }

      function getStates() {
        return $state.get();
      }

      function updateDocTitle() {
        const removeSuccessWatcher = $rootScope.$on('$stateChangeSuccess', updateTitle);

        function updateTitle(event: any, toState: any) {
          stateCounts.changes++;
          handlingStateChangeError = false;
          let title = config.docTitle + ' ' + (toState.title || '');
          $rootScope.title = title; // data bind to <title>
        }

        $rootScope.$on('$destroy', () => removeSuccessWatcher());
      }
    }
  }
}

export default angular.module('blocks.router.helperProvider', ['ui.router', logger])
  .provider('routerHelper', RouterHelperProvider)
  .name;
