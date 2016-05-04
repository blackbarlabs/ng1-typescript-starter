function byKeysFilter() {
  return function(input: any, keys: string[], isEnabled: boolean) {
    if (!input) { return; }
    if (!keys.length) { return; }
    if (!isEnabled) { return input; }

    let output = {};
    keys.forEach((key: string) => {
      output[key] = input[key];
    });
    return output;
  };
}

export default angular.module('byKeysFilter', [])
  .filter('byKeys', byKeysFilter)
  .name;
