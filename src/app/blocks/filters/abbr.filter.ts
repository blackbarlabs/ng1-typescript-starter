import * as _ from 'lodash';

function abbrFilter() {
  return function(input: any, fromFront: number, fromEnd: number, joinText: string = '...') {
    if (!_.isString(input)) { return; }

    let output = '';
    output += input.slice(0, fromFront);

    if ((fromFront + fromEnd) > input.length) { return output; }

    if (Math.abs(fromEnd)) {
      output += joinText;
      output += input.slice(-Math.abs(fromEnd));
    }

    return output;
  };
}

export default angular.module('abbrFilter', [])
  .filter('abbr', abbrFilter)
  .name;
