function hashToArrayFilter() {
  return function(input: any) {
    if (!input) { return; }

    let ids    = Object.keys(input),
        output = [];

    ids.forEach((id: string) => {
      output.push(input[id]);
    });

    return output;
  };
}

export default angular.module('hashToArrayFilter', [])
  .filter('hashToArray', hashToArrayFilter)
  .name;
