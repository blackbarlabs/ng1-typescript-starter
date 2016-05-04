// todo: import component .scss file here once webpack is set up to import dynamically required stylesheets

const threeDotSpinnerComponent: ng.IComponentOptions = {
  templateUrl: 'app/widgets/three-dot-spinner/three-dot-spinner.component.html'
};

export default angular.module('widgets.threeDotSpinner', [])
  .component('threeDotSpinner', threeDotSpinnerComponent)
  .name;
