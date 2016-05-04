import home from './home/home.routes';
import auth from './auth/auth.routes';

export default angular.module('app.routes', [home, auth])
  .name;
