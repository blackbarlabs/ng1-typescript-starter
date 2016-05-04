import {Action} from 'flux-standard-action';
import {IAuthActionPayload} from './auth.actions.ts';
import {UserData} from '../../../blocks/api/data/api-data.module';
import types from './auth.types';

export interface IAuthState {
  user: UserData;
  isFetching: boolean;
}

const initialAuthState: IAuthState = {
  user: <UserData>{},
  isFetching: false
};

export function authReducers(state: IAuthState = initialAuthState, action: Action<IAuthActionPayload>) {
  switch (action.type) {

    case types.LOGIN_REQUEST:
    case types.AUTH_USER_REQUEST:
      return (<any>Object).assign({}, state, {
        isFetching: true
      });

    case types.LOGIN_SUCCESS:
      return (<any>Object).assign({}, state, {
        isFetching: false,
        session: (<any>Object).assign({}, <IAuthActionPayload>action.payload.session)
      });

    case types.LOGIN_FAILURE:
      return (<any>Object).assign({}, state, {
        isFetching: false
      });

    case types.AUTH_USER_RECEIVE:
      return (<any>Object).assign({}, state, {
        isFetching: false,
        user: action.payload.user
      });

    case types.LOGOUT_SUCCESS:
      return (<any>Object).assign({}, initialAuthState);

    default:
      return state;
  }
}
