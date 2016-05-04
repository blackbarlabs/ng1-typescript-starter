import dollars from './dollars.filter';

describe('dollarsFilter', () => {
  let filter: ng.IFilterService;

  beforeEach(angular.mock.module(dollars));

  beforeEach(inject(($filter: any) => {
    filter = $filter('dollars');
  }));

  it('should compile', () => expect(filter).not.toBeNull());
});
