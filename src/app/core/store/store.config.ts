import {INgReduxProvider} from 'ng-redux';
import * as  thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import {rootReducer} from './root.reducer';

interface ICustomWindow extends ng.IWindowService {
  devToolsExtension?: Function;
}

export function createStore($ngReduxProvider: INgReduxProvider, shouldLog: boolean, window: ICustomWindow) {
  const reduxMiddleware: any[]     = [thunk, 'ngUiRouterMiddleware'],
        reduxEnhancers: Function[] = [window.devToolsExtension ? window.devToolsExtension() : f => f];

  if (shouldLog) { reduxMiddleware.push((createLogger as any)({ collapsed: true, duration: true })); }

  $ngReduxProvider.createStoreWith(rootReducer, reduxMiddleware, reduxEnhancers);
}

