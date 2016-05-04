function logInputFilter($log: ng.ILogService) {
  'ngInject';

  return function(input: any) {
    if (!input) { return; }

    $log.log('input:', input);

    return input;
  };
}

export default angular.module('logInputFilter', [])
  .filter('logInput', logInputFilter)
  .name;
