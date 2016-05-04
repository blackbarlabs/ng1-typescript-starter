import 'angular-ui-router';
import guid from '../guid/guid.module';

function config($urlMatcherFactoryProvider: any, guidRegex: RegExp) {
  'ngInject';

  // this allows custom router parameter types to be set for Angular UI Router
  // e.g. url: '/item/{id?guid}'
  $urlMatcherFactoryProvider.type('guid', {
    encode: angular.identity,
    decode: angular.identity,
    is: function(item: string) {
      return guidRegex.test(item);
    }
  });
}

export default angular.module('blocks.router.config', ['ui.router', guid])
  .config(config)
  .name;
