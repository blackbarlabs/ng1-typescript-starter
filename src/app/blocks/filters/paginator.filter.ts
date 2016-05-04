function paginatorFilter() {
  return function(input: any[], options: any) {
    if (!input) { return; }

    // this line updates the page numbering in the UI
    options.total = input.length;

    let startIndex     = (options.page - 1) * options.limit,
        displayedItems = input.splice(startIndex, options.limit),
        output         = [];

    displayedItems.forEach((item: any) => {
      output.push(item);
    });

    return output;
  };
}

export default angular.module('paginatorFilter', [])
  .filter('paginator', paginatorFilter)
  .name;
