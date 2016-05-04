import {Guid} from '../../guid/guid.module.ts';
import authApiBase, {AuthBaseDataService} from '../auth-api-base/auth-api-base.module';

export enum SessionMethod {
  Implicit = 4,
  Voucher
}

class CredentialData {
  constructor(public Method: number,
              public Provider: string,
              public UserId: string,
              public Token: string) {}
}

interface ISessionHeader {
  Name: string;
  Value: string;
}

export interface IDecodedSessionHeaderValue {
  session: string;
  authorization: string;
  iss: string;
  aud: string;
  exp: number;
  nbf: number;
}

export class SessionServerData {
  Credentials: CredentialData;

  constructor(public Id: string, method: number, provider: string, userId: string, token: string,
              public AuthorizationId?: string, public RefreshToken?: string, public SessionHeader?: ISessionHeader) {
    this.Credentials = new CredentialData(method, provider, userId, token);
  }
}

interface ISessionDataService {
  save: (id: string, method: number, provider: string, userId: string, token: string) => ng.IPromise<any>;
}

export class SessionDataService implements ISessionDataService {
  apiPath = 'Session';

  constructor(private guid: Guid, private AuthBaseDataService: AuthBaseDataService) { 'ngInject'; }

  save(id: string, method: number, provider: string, userId: string, token: string): ng.IPromise<any> {
    const dataId     = this.guid.isGuidAndNotEmpty(id) ? id : this.guid.generate(),
          serverData = new SessionServerData(dataId, method, provider, userId, token);
    return this.AuthBaseDataService.POST(this.apiPath, serverData);
  }
}

export default angular
  .module('api.sessionData', [authApiBase])
  .service('SessionDataService', SessionDataService)
  .name;
