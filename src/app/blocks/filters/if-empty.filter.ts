import * as _ from 'lodash';

function ifEmptyFilter() {
  return function(input: any, textPlaceholder: any) {
    // return booleans or numbers before falsey check
    if (_.isNumber(input) || _.isBoolean(input)) { return input; }
    // if empty string or other falsey value
    if (!input) { return textPlaceholder; }
    // if empty object
    if (_.isEqual({}, input)) { return textPlaceholder; }
    // if empty array
    if (_.isEqual([], input)) { return textPlaceholder; }
    return input;
  };
}

export default angular.module('ifEmptyFilter', [])
  .filter('ifEmpty', ifEmptyFilter)
  .name;
