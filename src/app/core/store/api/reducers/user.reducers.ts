import {Action} from 'flux-standard-action';
import {IUserActionPayload, IUserCollection} from '../actions/user.actions';
import types from '../types/user.types';

export interface IUserState {
  isFetching: boolean;
  entities: IUserCollection;
}

const initialUserState = {
  isFetching: false,
  entities: <IUserCollection>{}
};

export function userReducers(state: IUserState = initialUserState, action: Action<IUserActionPayload>) {
  switch (action.type) {

    case types.USER_SUBMIT:
      return (<any>Object).assign({}, state, {
        isFetching: true
      });

    case types.USER_REQUEST:
      return (<any>Object).assign({}, state, {
        isFetching: true
      });

    case types.USER_RECEIVE:
      return (<any>Object).assign({}, state, {
        isFetching: false,
        entities: _.merge({}, state.entities, action.payload.entities)
      });

    case types.USER_REMOVE:
      return (<any>Object).assign({}, state, {
        entities: (<any>Object).assign({}, _.omit(state.entities, action.payload.id))
      });

    default:
      return state;
  }
}
