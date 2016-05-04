import apiData, {StarterData, StarterDataService} from '../../../../blocks/api/data/api-data.module';
import actionService, {ActionService} from '../../action.service';
import {voidAction, payloadAction} from '../../action-helpers';
import types from '../types/starter.types.ts';

export interface IStarterCollection {
  [n: string]: StarterData;
}

export interface IStarterActionPayload {
  entities: IStarterCollection;
}

export interface IStarterActions {
  fetch: (id: string, distributorId: string) => ng.IPromise<any>;
  save: (id: string, distributorId: string, notes: string, whenConfirmed: Date) => ng.IPromise<any>;
}

export function starterActions(ActionService: ActionService, StarterDataService: StarterDataService) {
  'ngInject';

  function fetch(id: string, distributorId: string): any {
    return (dispatch: Function) => {
      dispatch(voidAction(types.STARTER_REQUEST));
      return StarterDataService.fetch(id, distributorId)
        .then((starters: StarterData[]) => {
          const entities = <IStarterCollection>{};
          starters.forEach((starter: StarterData) => entities[starter.id] = starter);
          dispatch(payloadAction(types.STARTER_RECEIVE, { entities }));
        });
    };
  }

  function save(id: string, distributorId: string, notes: string, whenConfirmed: Date): any {
    return (dispatch: Function) => {
      dispatch(voidAction(types.STARTER_SUBMIT));
      return StarterDataService.save(id, distributorId, notes, whenConfirmed)
        .then((updatedBase: StarterData) => {
          const entities: IStarterCollection = { [updatedBase.id]: updatedBase };
          dispatch(payloadAction(types.STARTER_RECEIVE, { entities }));
        });
    };
  }

  return ActionService.bindActionCreators(<IStarterActions>{ fetch, save });
}

export default angular
  .module('store.api.starter', [apiData, actionService])
  .service('starterActions', starterActions)
  .name;
