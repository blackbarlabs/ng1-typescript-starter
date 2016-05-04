import byKeysFilter from './by-keys.filter';

describe('byKeysFilter', () => {
  let filter: ng.IFilterService;

  beforeEach(angular.mock.module(byKeysFilter));

  beforeEach(inject(($filter: any) => {
    filter = $filter('byKeys');
  }));

  it('should compile', () => expect(filter).not.toBeNull());
});
