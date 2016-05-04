import {bindActionCreators} from 'redux';
import ngRedux, {INgRedux} from 'ng-redux';

export class ActionService {
  constructor(private $q: ng.IQService, private $ngRedux: INgRedux) { 'ngInject'; }

  bindActionCreators(actionCreators: any) {
    return bindActionCreators(actionCreators, this.$ngRedux.dispatch);
  }

  dispatch(payload: any) {
    return this.$ngRedux.dispatch(payload);
  }

  rejectPromise(reason: string): ng.IPromise<any> {
    return this.$q.reject(reason);
  }

  allPromises(promises: ng.IPromise<any>[]): ng.IPromise<any> {
    return this.$q.all(promises);
  }

  whenPromise(payload?: any): ng.IPromise<any> { return this.$q.when(payload); }
}

export default angular
  .module('store.actionService', [ngRedux])
  .service('ActionService', ActionService)
  .name;
