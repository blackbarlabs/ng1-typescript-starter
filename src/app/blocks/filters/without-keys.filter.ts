function withoutKeysFilter() {
  return function(input: any, keys: string[], isEnabled: boolean) {
    if (!input) { return; }
    if (!keys.length) { return; }
    if (!isEnabled) { return input; }

    keys.forEach((key: string) => {
      delete input[key];
    });

    return input;
  };
}

export default angular.module('withoutKeysFilter', [])
  .filter('withoutKeys', withoutKeysFilter)
  .name;
