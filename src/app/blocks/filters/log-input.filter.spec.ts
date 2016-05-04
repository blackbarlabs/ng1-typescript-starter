import logInput from './log-input.filter';

describe('logInputFilter', () => {
  let filter: ng.IFilterService;

  beforeEach(angular.mock.module(logInput));

  beforeEach(inject(($filter: any) => {
    filter = $filter('logInput');
  }));

  it('should compile', () => expect(filter).not.toBeNull());
});
