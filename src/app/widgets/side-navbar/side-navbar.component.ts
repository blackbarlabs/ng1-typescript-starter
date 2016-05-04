import {INgRedux} from 'ng-redux';
import * as router from 'redux-ui-router';
import {IAppState} from '../../core/store/store.interface.ts';
import * as _ from 'lodash';

class SideNavbarComponentController {
  tabs: { name: string, heading: string }[];
  setActive: (index: number) => Function;
  private disconnect: Function;

  constructor($ngRedux: INgRedux) {
    'ngInject';

    this.disconnect = $ngRedux.connect(this.mapStateToThis.bind(this))(this);
    this.setActive = (index: number): Function => $ngRedux.dispatch(router.stateGo(this.tabs[index].name));
  }

  $onDestroy() { this.disconnect(); }

  mapStateToThis(state: IAppState) {
    const active    = angular.copy(state.router.currentState.name),
          activeTab = _.findIndex(this.tabs, ['name', active]);
    return { active, activeTab };
  }
}

export const SideNavbarComponent: ng.IComponentOptions = {
  bindings: {
    tabs: '<'
  },
  templateUrl: 'app/widgets/side-navbar/side-navbar.component.html',
  controller: SideNavbarComponentController
};

export default angular.module('widgets.sideNavbar', [])
  .component('sideNavbar', SideNavbarComponent)
  .name;
