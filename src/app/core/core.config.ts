import appConstants from './constants';
import {RouterHelperProvider} from '../blocks/router/router-helper.provider';
import {ExceptionHandlerProvider} from '../blocks/exception/exception-handler.provider';
import {createStore} from './store/store.config';
import {INgReduxProvider} from 'ng-redux';
import {AuthBaseDataServiceConfigProvider} from '../blocks/api/auth-api-base/auth-base-data-service-config.provider';
import {
  StarterBaseDataServiceConfigProvider
} from '../blocks/api/starter-api-base/starter-base-data-service-config.provider';
import {AuthServiceConfigProvider} from '../routes/auth/auth.service';

const { environmentConfig, environmentVars, appErrorPrefix, appTitle } = appConstants,
      {
        shouldLog: shouldLogKey, authApiUrl: authApiUrlKey, starterApiUrl: starterApiUrlKey,
        apiSuffix: apiSuffixKey, siteAdminKey: siteAdminKeyKey, siteAdminToken: siteAdminTokenKey
      } = environmentVars;

interface IEnvServiceProvider extends ng.environment.ServiceProvider, ng.environment.Service {}

export function config($logProvider: ng.ILogProvider, routerHelperProvider: RouterHelperProvider,
                       envServiceProvider: IEnvServiceProvider, AuthServiceConfigProvider: AuthServiceConfigProvider,
                       exceptionHandlerProvider: ExceptionHandlerProvider, toastrConfig: any,
                       $ngReduxProvider: INgReduxProvider, $windowProvider: ng.IServiceProvider,
                       AuthBaseDataServiceConfigProvider: AuthBaseDataServiceConfigProvider,
                       StarterBaseDataServiceConfigProvider: StarterBaseDataServiceConfigProvider) {
  'ngInject';
  // set up environment variables
  envServiceProvider.config(environmentConfig);
  envServiceProvider.check();
  const shouldLog = envServiceProvider.read(shouldLogKey);

  // configure log
  $logProvider.debugEnabled(shouldLog);
  exceptionHandlerProvider.configure(appErrorPrefix);
  routerHelperProvider.configure({ docTitle: appTitle + ': ' });

  // set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventOpenDuplicates = true;

  // configure api bases
  const starterApiBase = envServiceProvider.read(starterApiUrlKey),
        authApiBase     = envServiceProvider.read(authApiUrlKey),
        apiSuffix       = envServiceProvider.read(apiSuffixKey);
  AuthBaseDataServiceConfigProvider.configure(authApiBase, apiSuffix);
  StarterBaseDataServiceConfigProvider.configure(starterApiBase, apiSuffix);

  // configure AuthService
  const siteAdminKey   = envServiceProvider.read(siteAdminKeyKey),
        siteAdminToken = envServiceProvider.read(siteAdminTokenKey);
  AuthServiceConfigProvider.siteAdminKey = siteAdminKey;
  AuthServiceConfigProvider.siteAdminToken = siteAdminToken;

  // create redux store
  createStore($ngReduxProvider, shouldLog, $windowProvider.$get());
}
