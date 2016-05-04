import IParseService = angular.IParseService;
import IScope = angular.IScope;

export function fileModelDirective($parse: IParseService) {
  'ngInject';

  let directive = {
    restrict: 'A',
    link
  };

  function link(scope: IScope, element: any, attrs: any) {

    let model = $parse(attrs.fileModel);

    element.bind('change', () => {
      scope.$apply(() => {
        model.assign(scope, element[0].files[0]);
      });
    });
  }

  return directive;
}

export default angular.module('fileModelDirective', [])
  .directive('fileModel', fileModelDirective)
  .name;
