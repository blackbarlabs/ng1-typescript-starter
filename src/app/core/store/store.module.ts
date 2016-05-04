import apiActions from './api/actions/api-actions.module';
import authActions from './auth/auth.module';

export default angular
  .module('core.store', [apiActions, authActions])
  .name;
