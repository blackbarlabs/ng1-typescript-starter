import {Action} from 'flux-standard-action';
import {IStarterActionPayload, IStarterCollection} from '../actions/starter.actions.ts';
import types from '../types/starter.types.ts';

export interface IStarterState {
  isFetching: boolean;
  entities: IStarterCollection;
}

const initialStarterState = {
  isFetching: false,
  entities: <IStarterCollection>{}
};

export function starterReducers(state: IStarterState = initialStarterState, action: Action<IStarterActionPayload>) {
  switch (action.type) {

    case types.STARTER_REQUEST:
    case types.STARTER_SUBMIT:
      return (<any>Object).assign({}, state, {
        isFetching: true
      });

    case types.STARTER_RECEIVE:
      return (<any>Object).assign({}, state, {
        isFetching: false,
        entities: (<any>Object).assign({}, state.entities, action.payload.entities)
      });

    default:
      return state;
  }
}
