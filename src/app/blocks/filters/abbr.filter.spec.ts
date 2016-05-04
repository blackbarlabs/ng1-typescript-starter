import abbrFilter from './abbr.filter';

describe('abbrFilter', () => {
  let filter: (input: any, fromFront: number, fromEnd?: number, joinText?: string) => string;

  beforeEach(angular.mock.module(abbrFilter));

  beforeEach(inject(($filter: any) => {
    filter = $filter('abbr');
  }));

  it('should compile', () => expect(filter).not.toBeNull());

  it('should not abbreviate non-strings', () => {
    expect(filter([1, 2, 3], 1)).toBeUndefined();
    expect(filter({ a: 1, b: 2 }, 1)).toBeUndefined();
    expect(filter(true, 1)).toBeUndefined();
  });

  it('should abbreviate strings', () => {
    const input = 'I am an example text string.';
    expect(filter(input, 3)).toEqual('I a');
    expect(filter(input, 3, 4)).toEqual('I a...ing.');
    expect(filter(input, 3, -4)).toEqual('I a...ing.');
    expect(filter(input, 3, 7, ' short ')).toEqual('I a short string.');
    expect(filter(input, 100, 100)).toEqual(input);
  });
});
