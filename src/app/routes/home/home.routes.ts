import routerHelper from '../../blocks/router/router.module';
import homeComponent from './home.component';

export function appRun(routerHelper: any) {
  'ngInject';
  routerHelper.configureStates(getStates());
}

function getStates() {
  return [
    {
      state: 'home',
      config: {
        url: '/',
        template: '<home></home>',
        title: 'home'
      }
    }
  ];
}

export default angular.module('home.routes', [routerHelper, homeComponent])
  .run(appRun)
  .name;
