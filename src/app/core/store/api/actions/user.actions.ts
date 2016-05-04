import apiData, {UserData, UserDataService} from '../../../../blocks/api/data/api-data.module';
import actionService, {ActionService} from '../../action.service';
import {voidAction, payloadAction} from '../../action-helpers';
import types from '../types/user.types';

export interface IUserCollection {
  [n: string]: UserData;
}

export interface IUserActions {
  fetch: (id?: string, accountId?: string) => ng.IPromise<any>;
  fetchAuthenticated: (accountId: string) => ng.IPromise<UserData>;
  save: (id: string, account: string, company: string, buyerName: string, email: string, phone: string, address: string,
         city: string, state: string, zip: string, dateWelcomeEmailSent: Date, isTestUser: boolean) => ng.IPromise<any>;
  remove: (id: string) => ng.IPromise<any>;
}

export interface IUserActionPayload {
  id?: string;
  entities?: IUserCollection;
}

export function userActions(ActionService: ActionService, UserDataService: UserDataService): IUserActions {
  'ngInject';

  function fetch(id?: string, accountId?: string): any {
    return (dispatch: Function) => {
      dispatch(voidAction(types.USER_REQUEST));
      return UserDataService.fetch(id, accountId)
        .then((users: UserData[]) => {
          const entities = <IUserCollection>{};
          users.forEach((user: UserData) => entities[user.id] = user);
          dispatch(payloadAction(types.USER_RECEIVE, { entities }));
        });
    };
  }

  function fetchAuthenticated(accountId: string): any {
    return (dispatch: Function) => {
      dispatch(voidAction(types.USER_REQUEST));
      return UserDataService.fetch(null, accountId)
        .then((users: UserData[]) => {
          dispatch(payloadAction(types.USER_RECEIVE, {}));
          return users[0];
        });
    };
  }

  function save(id: string, account: string, company: string, buyerName: string, email: string, phone: string,
                address: string, city: string, state: string, zip: string,
                dateWelcomeEmailSent: Date, isTestUser: boolean): any {
    return (dispatch: Function) => {
      dispatch(voidAction(types.USER_SUBMIT));
      return UserDataService.save(id, account, company, buyerName, email, phone, address, city, state,
                                  zip, dateWelcomeEmailSent, isTestUser)
        .then((entity: UserData) => {
          const entities: IUserCollection = { [entity.id]: <UserData>_.omitBy(entity, _.isUndefined) };
          dispatch(payloadAction(types.USER_RECEIVE, { entities }));
          return entity;
        });
    };
  }

  function remove(id: string): any {
    return (dispatch: Function) => {
      return UserDataService.remove(id)
        .then(() => dispatch(payloadAction(types.USER_REMOVE, { id })));
    };
  }

  return ActionService.bindActionCreators(<IUserActions>{ fetch, fetchAuthenticated, save, remove });
}

export default angular
  .module('store.api.user', [apiData, actionService])
  .service('userActions', userActions)
  .name;
