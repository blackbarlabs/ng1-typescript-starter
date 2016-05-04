import accountActions from './account.actions';
import starterActions from './starter.actions';
import sessionActions from './session.actions';
import userActions from './user.actions';

export {IAccountActions, IAccountCollection} from './account.actions';
export {ISessionActions} from './session.actions';
export {IStarterActions} from './starter.actions';
export {IUserActions} from './user.actions';

const dependencies = [accountActions, sessionActions, starterActions, userActions];

export default angular
  .module('store.api.actions', dependencies)
  .name;
