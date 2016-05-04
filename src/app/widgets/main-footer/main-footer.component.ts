const MainFooterComponent: ng.IComponentOptions = {
  templateUrl: 'app/widgets/main-footer/main-footer.component.html'
};

export default angular.module('mainFooterComponent', [])
  .component('mainFooter', MainFooterComponent)
  .name;
