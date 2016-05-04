/**
 * Initial module created by John Papa at: https://github.com/johnpapa/generator-hottowel
 */

import exception from './exception.ts';
import exceptionHandler from './exception-handler.provider';

export default angular.module('blocks.exception', [exceptionHandler, exception])
  .name;
