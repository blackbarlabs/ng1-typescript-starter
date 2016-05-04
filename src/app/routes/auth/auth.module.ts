import authRoutes from './auth.routes';
import authInterceptor from './auth.interceptor';
import authService from './auth.service.ts';
import loginComponent from './login.component.ts';

const dependencies = [authRoutes, authInterceptor, authService, loginComponent];

export default angular.module('app.routes.auth', dependencies)
  .name;
