import IScope = angular.IScope;
import IRootElementService = angular.IRootElementService;

export function selectOnClick() {
  const directive = {
    restrict: 'A',
    link: link
  };

  return directive;

  function link(scope: IScope, element: IRootElementService) {
    element.on('click', selectInputText);
  }
}

function selectInputText() {
  if (!this.value) { return; }
  this.setSelectionRange(0, this.value.length);
}

export default angular.module('selectOnClickDirective', [])
  .directive('selectOnClick', selectOnClick)
  .name;
