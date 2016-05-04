import ifEmpty from './if-empty.filter';

describe('ifEmptyFilter', () => {
  let filter: ng.IFilterService;

  beforeEach(angular.mock.module(ifEmpty));

  beforeEach(inject(($filter: any) => {
    filter = $filter('ifEmpty');
  }));

  it('should compile', () => expect(filter).not.toBeNull());
});
