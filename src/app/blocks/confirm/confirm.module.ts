import IModalService = angular.ui.bootstrap.IModalService;
import IPromise = angular.IPromise;

export class Confirm {
  constructor(private $uibModal: IModalService) { 'ngInject'; }

  remove(message: string, buttonText: string = 'Delete', buttonClass: string = 'btn-danger'): IPromise<any> {
    return this.openWithConfig(message, buttonText, buttonClass);
  }

  submit(message: string, buttonText: string = 'Submit', buttonClass: string = 'btn-primary'): IPromise<any> {
    return this.openWithConfig(message, buttonText, buttonClass);
  }

  private openWithConfig(message: string, buttonText: string, buttonClass: string): IPromise<any> {
    let modalInstance,
        options = {
          size: 'md',
          template: `
            <div>
              <div class="modal-body">
                <h4 class="align-center"><strong>${message}</strong></h4>
                <div class="clearfix">
                  <button
                    class="btn ${buttonClass} pull-right"
                    style="margin-left: 1rem;"
                    type="button"
                    ng-click="$close()">
                    ${buttonText}
                  </button>
                  <button class="btn btn-default pull-right" type="button" ng-click="$dismiss()">Cancel</button>
                </div>
              </div>
            </div>
          `
        };
    modalInstance = this.$uibModal.open(options);

    return modalInstance.result;
  }
}

export default angular.module('blocks.confirm', ['ui.bootstrap'])
  .service('confirm', Confirm)
  .name;
