import isInArray from './is-in-array.filter';

describe('isInArrayFilter', () => {
  let filter: ng.IFilterService;

  beforeEach(angular.mock.module(isInArray));

  beforeEach(inject(($filter: any) => {
    filter = $filter('isInArray');
  }));

  it('should compile', () => expect(filter).not.toBeNull());
});
