export function errorSrcDirective() {
  'ngInject';

  const directive = {
    restrict: 'A',
    link
  };

  function link(scope: ng.IScope, element: any, attrs: any) {
    element.bind('error', () => {
      if (attrs.src !== attrs.errorSrc) { attrs.$set('src', attrs.errorSrc); }
    });

    attrs.$observe('ngSrc', (value: string) => {
      if (!value && attrs.errorSrc) { attrs.$set('src', attrs.errorSrc); }
    });
  }

  return directive;
}

export default angular.module('errorSrcDirective', [])
  .directive('errorSrc', errorSrcDirective)
  .name;
