import core from '../../core/core.module';

class HomeController {
  constructor() {
    'ngInject';
  }
}

export const HomeComponent: ng.IComponentOptions = {
  template: '<div>Home</div>',
  controller: HomeController
};

export default angular.module('home.rootComponent', [core])
  .component('home', HomeComponent)
  .name;
