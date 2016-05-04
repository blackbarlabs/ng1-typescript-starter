import paginator from './paginator.filter';

describe('paginatorFilter', () => {
  let filter: ng.IFilterService;

  beforeEach(angular.mock.module(paginator));

  beforeEach(inject(($filter: any) => {
    filter = $filter('paginator');
  }));

  it('should compile', () => expect(filter).not.toBeNull());
});
