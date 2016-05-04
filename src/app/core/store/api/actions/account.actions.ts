import apiData, {AccountData, AccountDataService} from '../../../../blocks/api/data/api-data.module';
import actionService, {ActionService} from '../../action.service';
import {voidAction, payloadAction} from '../../action-helpers';
import types from '../types/account.types';

export interface IAccountCollection {
  [n: string]: AccountData;
}

export interface IAccountActions {
  fetch: (id: string|string[]) => ng.IPromise<any>;
  save: (id: string, username: string, password: string, siteAdminToken: string) => ng.IPromise<any>;
}

export interface IAccountActionPayload {
  id?: string;
  entities?: IAccountCollection;
}

export function accountActions(ActionService: ActionService, AccountDataService: AccountDataService): IAccountActions {
  'ngInject';

  function fetch(id: string|string[]): any {
    return (dispatch: Function) => {
      // todo: have server return multipart response
      if (_.isEmpty(id)) { return ActionService.rejectPromise('Account id is a required parameter.'); }
      const ids                             = id.toString().split(','),
            apiPromises: ng.IPromise<any>[] = [];

      ids.forEach((accountId: string) => {
        if (!accountId) { return; }
        apiPromises.push((() => {
          dispatch(voidAction(types.ACCOUNT_REQUEST));
          return AccountDataService.fetch(accountId)
            .then((entity: AccountData[]) => {
              const entities: IAccountCollection = { [accountId]: entity[0] };
              dispatch(payloadAction(types.ACCOUNT_RECEIVE, <IAccountActionPayload>{ entities }));
            });
        })());
      });

      return ActionService.allPromises(apiPromises).catch(catchError);
    };
  }

  function save(id: string, username: string, password: string, siteAdminToken: string): any {
    return (dispatch: Function) => {
      dispatch(voidAction(types.ACCOUNT_SUBMIT));
      return AccountDataService.save(id, username, password, siteAdminToken)
        .then((entity: AccountData) => {
          const entities: IAccountCollection = { [entity.id]: entity };
          dispatch(voidAction(types.ACCOUNT_SUCCESS));
          dispatch(payloadAction(types.ACCOUNT_RECEIVE, <IAccountActionPayload>{ entities }));
          return entity;
        })
        .catch(catchError);
    };
  }

  function catchError(err: any) {
    ActionService.dispatch(voidAction(types.ACCOUNT_ERROR));
    return ActionService.rejectPromise(err);
  }

  return ActionService.bindActionCreators(<IAccountActions>{ fetch, save });
}

export default angular
  .module('store.api.account', [apiData, actionService])
  .service('accountActions', accountActions)
  .name;
