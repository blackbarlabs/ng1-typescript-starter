import groupByNestedProp from './group-by-nested-prop.filter';

describe('groupByNestedPropFilter', () => {
  let filter: ng.IFilterService;

  beforeEach(angular.mock.module(groupByNestedProp));

  beforeEach(inject(($filter: any) => {
    filter = $filter('groupByNestedProp');
  }));

  it('should compile', () => expect(filter).not.toBeNull());
});
