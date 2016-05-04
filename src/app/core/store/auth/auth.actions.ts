import * as router from 'redux-ui-router';
import authService, {AuthService} from '../../../routes/auth/auth.service.ts';
import {UserData, AccountData, SessionServerData, SessionMethod} from '../../../blocks/api/data/api-data.module';
import apiActions, {
  ISessionActions,
  IUserActions,
  IAccountActions,
  IAccountCollection
} from '../api/actions/api-actions.module';
import types from './auth.types';
import rootTypes from '../root.types';
import actionService, {ActionService} from '../action.service';
import {voidAction, payloadAction} from '../action-helpers';
// todo: move to blocks.auth

export interface IUserAccountData {
  user: UserData;
  account: AccountData;
  isSiteAdmin: boolean;
}

export interface IAuthActionPayload {
  accounts?: IAccountCollection;
  session?: SessionServerData;
  user?: UserData;
}

export interface IAuthActions {
  bootstrap: () => void;
  isAuthenticated: () => boolean;
  isSiteAdmin: () => boolean;
  getAuthenticatedUser: () => ng.IPromise<void>;
  getAuthenticatedAccount: () => ng.IPromise<void>;
  login: (username: string, password: string, destinationUrl: string, method?: number) => ng.IPromise<void>;
  updatePassword: (password: string, accountId?: string, username?: string) => ng.IPromise<void>;
  logout: () => ng.IPromise<any>;
}

export function authActions($location: ng.ILocationService, ActionService: ActionService, AuthService: AuthService,
                            sessionActions: ISessionActions, userActions: IUserActions,
                            accountActions: IAccountActions) {
  'ngInject';
  function bootstrap(): any {
    return (dispatch: Function, getState: Function) => {
      if (dispatch(isAuthenticated())) {
        const apiPromises = [
          dispatch(getAuthenticatedUser()),
          dispatch(getAuthenticatedAccount())
        ];
        ActionService.allPromises(apiPromises)
          // this kills the session if the user no longer exists in the system and forces user to login fresh
          .then(() => { if (!getState().auth.user) { dispatch(logout()); } });
      }
    };
  }

  function isAuthenticated(): any {
    return (dispatch: Function): boolean => {
      if (AuthService.isAuthenticated()) {
        dispatch(voidAction(types.USER_AUTHENTICATED));
        return true;
      } else {
        dispatch(voidAction(types.USER_UNAUTHENTICATED));
        return false;
      }
    };
  }

  function isSiteAdmin(): any {
    return (): boolean => {
      return AuthService.isSiteAdmin();
    };
  }

  function getAuthenticatedUser(): any {
    return (dispatch: Function) => {
      if (!AuthService.isAuthenticated()) { return ActionService.whenPromise(); }
      dispatch(voidAction(types.AUTH_USER_REQUEST));
      const accountId = AuthService.getDecodedSessionHeaderValue().authorization;
      return userActions.fetchAuthenticated(accountId)
        .then((user: UserData) => {
          dispatch(payloadAction(types.AUTH_USER_RECEIVE, <IAuthActionPayload>{ user }));
        });
    };
  }

  function getAuthenticatedAccount(): any {
    return (dispatch: Function) => {
      if (!AuthService.isAuthenticated()) { return ActionService.whenPromise(); }
      dispatch(voidAction(types.AUTH_ACCOUNT_REQUEST));
      const accountId = AuthService.getDecodedSessionHeaderValue().authorization;
      return accountActions.fetch(accountId)
        .then(() => dispatch(voidAction(types.AUTH_ACCOUNT_RECEIVE)));
    };
  }

  function login(username: string, password: string, destinationUrl: string,
                 method: number = SessionMethod.Implicit): any {
    return (dispatch: Function) => {
      dispatch(voidAction(types.LOGIN_REQUEST));
      return sessionActions.save(null, method, 'http://starter.com/api/Auth', username, password)
        .then(AuthService.saveSessionToStorage.bind(AuthService))
        .then(receiveSession, receiveError);

      function receiveSession(session: SessionServerData) {
        dispatch(payloadAction(types.LOGIN_SUCCESS, <IAuthActionPayload>{ session }));
        dispatch(bootstrap());
        return $location.url(destinationUrl);
      }

      function receiveError(err: any) {
        dispatch(voidAction(types.LOGIN_FAILURE));
        return ActionService.rejectPromise(err);
      }
    };
  }

  function updatePassword(password: string, accountId?: string, username?: string): any {
    return (dispatch: Function, getState: Function) => {
      accountId = accountId || getState().auth.user.accountId;
      username = username || getState().api.account.entities[accountId].username;
      return accountActions.save(accountId, username, password, undefined);
    };
  }

  function logout(): any {
    return (dispatch: Function) => {
      dispatch(voidAction(types.LOGOUT_REQUEST));
      AuthService.logout();
      dispatch(voidAction(types.LOGOUT_SUCCESS));
      dispatch(voidAction(rootTypes.APP_STATE_RESET));
      return dispatch(router.stateGo('login', { ignoreToUrl: true }));
    };
  }

  const actionCreator = <IAuthActions>{
    bootstrap,
    isAuthenticated,
    isSiteAdmin,
    login,
    updatePassword,
    logout,
    getAuthenticatedUser,
    getAuthenticatedAccount
  };

  return ActionService.bindActionCreators(actionCreator);
}

export default angular
  .module('store.auth.authActions', [apiActions, actionService, authService])
  .service('authActions', authActions)
  .name;
