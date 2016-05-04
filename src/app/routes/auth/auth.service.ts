import _ = require('lodash');
import {Moment} from 'moment';
import {SessionServerData, IDecodedSessionHeaderValue} from '../../blocks/api/data/api-data.module';
import localStorage, {LocalStorageService} from '../../blocks/local-storage/local-storage.module';
import moment = require('moment');
import jwtDecode = require('jwt-decode');

// could not find another way to shut up the compiler
declare type moment = () => Moment;

export class UrlCredential {
  userId: string;
  token: string;

  constructor(userId: string, token: string) {
    if (!userId || !token) { return null; }
    this.userId = userId;
    this.token = token;
  }
}

// allows service to be injected into angular.config blocks
export class AuthServiceConfigProvider {
  siteAdminKey: string = undefined;
  siteAdminToken: string = undefined;
  $get = () => this;
}

export class AuthService {
  private siteAdminKey: string = undefined;
  private siteAdminToken: string = undefined;

  constructor(private localStorage: LocalStorageService, private $httpParamSerializer: any,
              AuthServiceConfig: AuthServiceConfigProvider) {
    'ngInject';

    if (!AuthServiceConfig.siteAdminKey) { throw new Error('Site admin key has not been set.'); }
    this.siteAdminKey = AuthServiceConfig.siteAdminKey;

    if (!AuthServiceConfig.siteAdminToken) { throw new Error('Site admin token has not been set.'); }
    this.siteAdminToken = AuthServiceConfig.siteAdminToken;

    // clean up old session data no longer used by the site
    // safe to remove the following line after 5/1/15
    if (localStorage.getItem('tokenSession')) { localStorage.removeItem('tokenSession'); }
  }

  isAuthenticated(): boolean { return !_.isEmpty(this.localStorage.getItem('session')); }

  isSiteAdmin(): boolean {
    if (!this.isAuthenticated()) { return false; }
    return this.getDecodedSessionHeaderValue()[this.siteAdminKey] === 'http://starter.com';
  }

  getSiteAdminToken = () => this.siteAdminToken;

  getCredentialsFromLocationSearch(params: UrlCredential): UrlCredential {
    if (!params) { return <UrlCredential>{}; }
    return new UrlCredential(params.userId, params.token);
  }

  urlWithoutCredentials(urlBase: string, params: any): string {
    delete params.token;
    delete params.userId;
    return _.isEmpty(params) ? urlBase : urlBase + '?' + this.$httpParamSerializer(params);
  }

  getSessionFromStorage(): SessionServerData {
    // reassign object so that stored session is not decoded or mutated
    const session = this.localStorage.getItem('session');
    // check if session is empty
    if (_.isEmpty(session)) { return null; }
    // check if session is old version of session and force new session if it is
    if (!session.SessionHeader) {
      this.localStorage.removeItem('session');
      return null;
    }
    return session;
  }

  getDecodedSessionHeaderValue(): IDecodedSessionHeaderValue {
    const session = this.getSessionFromStorage();
    if (!session) { return <IDecodedSessionHeaderValue>{}; }
    // session header value is format 'Bearer ${jwt}' so we just want to decode the jwt
    return jwtDecode(session.SessionHeader.Value.split(' ')[1]);
  }

  saveSessionToStorage(session: SessionServerData): SessionServerData {
    this.localStorage.setItem('session', session);
    return session;
  }

  removeSessionFromStorage(): boolean { return this.localStorage.removeItem('session'); }

  logout(): void { this.localStorage.removeItem('session'); }
}

export default angular.module('auth.authService', [localStorage])
  .provider('AuthServiceConfig', AuthServiceConfigProvider)
  .service('AuthService', AuthService)
  .name;
