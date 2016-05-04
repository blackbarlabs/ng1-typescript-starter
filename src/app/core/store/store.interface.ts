import {IAuthState} from './auth/auth.reducers.ts';
import {IRootApiState} from './api/api-root.reducers';

export interface IRouterState {
  currentParams: any;
  currentState: any;
  prevParams: any;
  prevState: any;
}

export interface IAppState {
  auth: IAuthState;
  router: IRouterState;
  api: IRootApiState;
}
