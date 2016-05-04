export function appRun($rootScope: ng.IRootScopeService, $state: ng.ui.IStateService, routerHelper: any) {
  'ngInject';

  // enable error states to be thrown in state resolve methods.
  const stopStateChangeErrorWatcher = $rootScope.$on('$stateChangeError', handleStateChangeError);

  function handleStateChangeError(event: any, toState: string, toStateParams: any, fromState: string,
                                  fromStateParams: any, error: any) {
    if (error && error.state) {
      $state.go(error.state, error.params, error.options);
    }
  }

  $rootScope.$on('$destroy', () => stopStateChangeErrorWatcher());

  const otherwise = '/404';
  routerHelper.configureStates(getStates(), otherwise);
}

function getStates() {
  return [
    {
      state: '404',
      config: {
        templateUrl: 'app/core/404.html',
        title: '404',
        url: '/404'
      }
    }
  ];
}
