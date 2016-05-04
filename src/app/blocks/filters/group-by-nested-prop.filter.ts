import * as _ from 'lodash';

export function groupByNestedPropFilter() {
  'ngInject';

  return _.memoize(filter, resolver);

  function filter(input: any, property: string) {
    if (angular.isUndefined(property) || angular.isUndefined(input)) { return input; }

    return _.groupBy(input, property);
  }

  function resolver(input: any, property: string) {
    return angular.toJson(input) + property;
  }
}

export default angular.module('groupByNestedPropFilter', [])
  .filter('groupByNestedProp', groupByNestedPropFilter)
  .name;
