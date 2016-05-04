import * as router from 'redux-ui-router';
import {INgRedux} from 'ng-redux';
import {IAppState} from '../../core/store/store.interface.ts';
import core from '../../core/core.module';
import {IAuthActions} from '../../core/store/auth/auth.actions';

class MainNavbarComponentController {
  username: string;
  isSiteAdmin: () => boolean;
  logout: () => void;
  private disconnect: Function;

  constructor($ngRedux: INgRedux, authActions: IAuthActions) {
    'ngInject';

    this.isSiteAdmin = authActions.isSiteAdmin;
    this.logout = () => $ngRedux.dispatch(router.stateGo('logout'));
    this.disconnect = $ngRedux.connect(this.mapStateToThis)(this);
  }

  $onDestroy() { this.disconnect(); }

  mapStateToThis(state: IAppState) {
    const accountId = state.auth.user ? state.auth.user.accountId : null,
          account   = accountId ? state.api.account.entities[accountId] : null,
          username  = account ? account.username : '';

    return { username };
  }
}

const MainNavbarComponent: ng.IComponentOptions = {
  templateUrl: 'app/widgets/main-navbar/main-navbar.component.html',
  controller: MainNavbarComponentController
};

export default angular.module('mainNavbarComponent', [core])
  .component('mainNavbar', MainNavbarComponent)
  .name;
