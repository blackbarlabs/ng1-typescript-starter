import withoutKeys from './without-keys.filter';

describe('withoutKeysFilter', () => {
  let filter: ng.IFilterService;

  beforeEach(angular.mock.module(withoutKeys));

  beforeEach(inject(($filter: any) => {
    filter = $filter('withoutKeys');
  }));

  it('should compile', () => expect(filter).not.toBeNull());
});
