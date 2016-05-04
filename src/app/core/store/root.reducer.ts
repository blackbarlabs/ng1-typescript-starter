import {router} from 'redux-ui-router';
import {combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {authReducers as auth} from './auth/auth.reducers';
import {apiRootReducer as api} from './api/api-root.reducers';
import {IAppState} from './store.interface';
import types from './root.types';

const appReducer = combineReducers({ router, auth, api });

export const rootReducer = (state: IAppState, action: Action<any>) => {
  if (action.type === types.APP_STATE_RESET) {
    // only volatile portions of the state need to be reset
    state.auth = state.api = undefined;
  }
  return appReducer(state, action);
};
