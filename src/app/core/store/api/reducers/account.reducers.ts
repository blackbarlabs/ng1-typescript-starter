import {Action} from 'flux-standard-action';
import {IAccountActionPayload, IAccountCollection} from '../actions/account.actions';
import types from '../types/account.types';

export interface IAccountState {
  isFetching: boolean;
  entities: IAccountCollection;
}

const initialAccountState = {
  isFetching: false,
  entities: <IAccountCollection>{}
};

export function accountReducers(state: IAccountState = initialAccountState, action: Action<IAccountActionPayload>) {
  switch (action.type) {

    case types.ACCOUNT_REQUEST:
      return (<any>Object).assign({}, state, {
        isFetching: true
      });

    case types.ACCOUNT_RECEIVE:
      return (<any>Object).assign({}, state, {
        isFetching: false,
        entities: (<any>Object).assign({}, _.merge(state.entities, <IAccountActionPayload>action.payload.entities))
      });

    case types.ACCOUNT_SUCCESS:
    case types.ACCOUNT_ERROR:
      return (<any>Object).assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}
