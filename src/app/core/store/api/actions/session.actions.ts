import apiData, {SessionDataService, SessionServerData} from '../../../../blocks/api/data/api-data.module';
import actionService, {ActionService} from '../../action.service';
import {voidAction, payloadAction} from '../../action-helpers';
import types from '../types/session.types';

export interface ISessionActions {
  save: (id: string, method: number, provider: string, userId: string, token: string) => ng.IPromise<SessionServerData>;
}

export interface ISessionActionPayload {
  entity: SessionServerData;
}

export function sessionActions(ActionService: ActionService, SessionDataService: SessionDataService) {
  'ngInject';

  function save(id: string, method: number, provider: string, userId: string, token: string): any {
    return (dispatch: Function) => {
      dispatch(voidAction(types.SESSION_SUBMIT));
      return SessionDataService.save(id, method, provider, userId, token)
        .then((session: SessionServerData) => {
          dispatch(payloadAction(types.SESSION_RECEIVE, { entity: session }));
          return session;
        });
    };
  }

  return ActionService.bindActionCreators(<ISessionActions>{ save });
}

export default angular
  .module('store.api.session', [apiData, actionService])
  .service('sessionActions', sessionActions)
  .name;
