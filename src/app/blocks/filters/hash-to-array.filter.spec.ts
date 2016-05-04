import hashToArray from './hash-to-array.filter';

describe('hasToArrayFilter', () => {
  let filter: ng.IFilterService;

  beforeEach(angular.mock.module(hashToArray));

  beforeEach(inject(($filter: any) => {
    filter = $filter('hashToArray');
  }));

  it('should compile', () => expect(filter).not.toBeNull());
});
