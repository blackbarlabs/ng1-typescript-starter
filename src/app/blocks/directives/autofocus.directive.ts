export function autoFocusDirective($timeout: ng.ITimeoutService) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link
  };

  function link(scope: ng.IScope, element: any) {
    $timeout(() => element[0].focus());
  }

  return directive;
}

export default angular.module('autofocus', [])
  .directive('autofocus', autoFocusDirective)
  .name;
