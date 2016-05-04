import 'angular-animate';
import 'angular-touch';
import 'angular-sanitize';
import 'angular-messages';
import 'angular-aria';
import 'angular-filter';
import 'angular-ui-bootstrap';
import 'angular-cookies';
import '../../../node_modules/angular-environment/dist/angular-environment.js';
import ngRedux from 'ng-redux';
import ngReduxUiRouter from 'redux-ui-router';
import exception from '../blocks/exception/exception.module';
import logger from '../blocks/logger/logger.module';
import filters from '../blocks/filters/filters.module';
import router from '../blocks/router/router.module';
import autofocus from '../blocks/directives/autofocus.directive';
import errorSrc from '../blocks/directives/error-src.directive';
import pageLoadProgress from '../blocks/page-load-progress/page-load-progress.module';
import api from '../blocks/api/api.module';
import store from './store/store.module';
import authService from '../routes/auth/auth.service';
import {config} from './core.config';
import {appRun} from './core.route';

const dependencies = [
  'ngAnimate', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'angular.filter', 'ui.bootstrap',
  'ngCookies', 'environment', ngRedux, ngReduxUiRouter, exception, logger, filters, router, autofocus, errorSrc,
  pageLoadProgress, api, store, authService
];

export default angular
  .module('app.core', dependencies)
  .config(config)
  .run(appRun)
  .name;
