import abbrFilter from './abbr.filter';
import byKeysFilter from './by-keys.filter';
import dollarsFilter from './dollars.filter';
import hashToArrayFilter from './hash-to-array.filter';
import groupByNestedPropFilter from './group-by-nested-prop.filter';
import ifEmptyFilter from './if-empty.filter';
import isInArrayFilter from './is-in-array.filter';
import logInputFilter from './log-input.filter';
import paginatorFilter from './paginator.filter';
import withoutKeysFilter from './without-keys.filter';

const dependencies = [abbrFilter, byKeysFilter, dollarsFilter, hashToArrayFilter, groupByNestedPropFilter,
  ifEmptyFilter, isInArrayFilter, logInputFilter, paginatorFilter, withoutKeysFilter];

export default angular.module('blocks.filters', dependencies)
  .name;
