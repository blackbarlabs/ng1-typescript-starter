import ILocationService = angular.ILocationService;
import IRootScopeService = angular.IRootScopeService;
import IStateService = angular.ui.IStateService;

describe('core', () => {
  describe('state', () => {
    let state, rootScope, location;
    const views = {
      four0four: 'app/core/404.html'
    };

    beforeEach(() => {
      angular.mock.module('app.core');
      inject(($location: ILocationService, $rootScope: IRootScopeService, $state: IStateService,
              $templateCache: ng.ITemplateCacheService) => {
        location = $location;
        state = $state;
        rootScope = $rootScope;
        $templateCache.put(views.four0four, '');
      });
    });

    it('should have a dummy test', () => {
      expect(true).toEqual(true);
    });

    it('should map /404 route to 404 View template', () => {
      expect(state.get('404').templateUrl).toEqual(views.four0four);
    });

    it('of 404 should work with $state.go', () => {
      state.go('404');
      rootScope.$apply();
      expect(state.is('404'));
    });

    it('should route /invalid to the otherwise (404) route', () => {
      location.path('/invalid');
      rootScope.$apply();
      expect(location.path()).toEqual('/404');
      expect(state.current.templateUrl).toEqual(views.four0four);
    });
  });
});
