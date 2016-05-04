import {combineReducers} from 'redux';
import {IAccountState, accountReducers as account} from './reducers/account.reducers';
import {IStarterState, starterReducers as starter} from './reducers/starter.reducers.ts';
import {IUserState, userReducers as user} from './reducers/user.reducers';

export interface IRootApiState {
  account: IAccountState;
  starter: IStarterState;
  user: IUserState;
}

const reducers = { account, starter, user };

export const apiRootReducer = combineReducers(reducers);
