import core from '../../core/core.module';
import {IAuthActions} from '../../core/store/auth/auth.actions.ts';
import {INgRedux} from 'ng-redux';
import {IAppState} from '../../core/store/store.interface';
import {Logger} from '../../blocks/logger/logger.module';

interface ICredentialData {
  username: string;
  password: string;
}

export class LoginComponentController {
  credentials: ICredentialData = <ICredentialData>{};
  isAuthFetching: boolean;
  destinationUrl: string;
  private disconnect: Function;

  constructor(private authActions: IAuthActions, private logger: Logger, $ngRedux: INgRedux) {
    'ngInject';
    this.disconnect = $ngRedux.connect(this.mapStateToThis)(this);
  }

  $onDestroy() { this.disconnect(); }

  clearCredentials() {
    this.credentials = <ICredentialData>{};
  }

  login() {
    this.authActions.login(this.credentials.username, this.credentials.password, this.destinationUrl)
      .catch((err: any) => {
        if (err && err.data && err.data.status > 400 && err.data.status < 500) {
          this.logger.error('Username or password is incorrect.');
        }
      })
      .finally(this.clearCredentials);
  }

  mapStateToThis(state: IAppState) {
    const isAuthFetching = state.auth.isFetching;
    return { isAuthFetching };
  }
}

const LoginComponent: ng.IComponentOptions = {
  bindings: { destinationUrl: '<' },
  templateUrl: 'app/routes/auth/login.component.html',
  controller: LoginComponentController
};

export default angular.module('loginComponent', [core])
  .component('login', LoginComponent)
  .name;
