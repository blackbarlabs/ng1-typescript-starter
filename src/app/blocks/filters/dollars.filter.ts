function dollarsFilter() {
  return function(input: number, decimals: number) {
    if (!input) { return; }
    return '$' + (Math.round(input * 100) / 100).toFixed(decimals);
  };
}

export default angular.module('dollarsFilter', [])
  .filter('dollars', dollarsFilter)
  .name;
