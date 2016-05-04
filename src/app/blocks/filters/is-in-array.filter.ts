import * as _ from 'lodash';

function isInArrayFilter() {
  'ngInject';

  return function(value: string, array: any[]) {
    if (!value) { return; }
    if (!array || !array.length) { return false; }

    return (_.indexOf(array, value) >= 0);
  };
}

export default angular.module('isInArrayFilter', [])
  .filter('isInArray', isInArrayFilter)
  .name;
