/**
 * include in index.html so that app level exceptions are handled.
 * exclude from testRunner.html which should run exactly what it wants to run
 */

import logger from '../logger/logger.module';

/**
 * Must configure the exception handling
 */
export class ExceptionHandlerProvider {
  config: any;

  constructor() {
    this.config = {
      appErrorPrefix: undefined
    };
  }

  configure(appErrorPrefix: any) {
    this.config.appErrorPrefix = appErrorPrefix;
  }

  $get() {
    return { config: this.config };
  }
}

/**
 * Configure by setting an optional string value for appErrorPrefix.
 * Accessible via config.appErrorPrefix (via config value).
 * @param  {Object} $provide
 */
function config($provide: ng.auto.IProvideService) {
  'ngInject';

  $provide.decorator('$exceptionHandler', ExtendExceptionHandler);
}

/**
 * Extend the $exceptionHandler service to also display a toast.
 * @param  {Object} $delegate
 * @param  {Object} exceptionHandler
 * @param  {Object} logger
 * @return {Function} the decorated $exceptionHandler service
 */

function ExtendExceptionHandler($delegate: any, exceptionHandler: any, $injector: ng.auto.IInjectorService) {
  'ngInject';

  // todo: remove the variable below and fix Angular circular dependency for logger in ExtendExceptionHandler()
  let logger; // initialize later

  return function(exception: any, cause: any) {

    let appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
    let errorData = { exception: exception, cause: cause };
    exception.message = appErrorPrefix + exception.message;

    // uncomment to delegate error handling to original exceptionHandler
    // $delegate(exception, cause);

    /**
     * Could add the error to a service's collection,
     * add errors to $rootScope, log errors to remote web server,
     * or log locally. Or throw hard. It is entirely up to you.
     * throw exception;
     *
     * @example
     *     throw { message: 'error message we added' };
     */

    if (!logger) { logger = $injector.get('logger'); }
    logger.error(exception.message, errorData);
  };
}

export default angular.module('blocks.exception.handler', [logger])
  .provider('exceptionHandler', ExceptionHandlerProvider)
  .config(config)
  .name;
