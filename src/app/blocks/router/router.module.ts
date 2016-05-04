import routerHelper from './router-helper.provider';
import routerConfig from './router.config';

export default angular
  .module('blocks.router', [routerHelper, routerConfig])
  .name;
