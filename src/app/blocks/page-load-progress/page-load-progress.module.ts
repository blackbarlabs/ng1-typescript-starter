import 'pace-progress';
import Pace = HubSpotPaceInterfaces.Pace;

interface IAppWindow extends ng.IWindowService {
  Pace: Pace;
}

function configPaceSpinner($window: IAppWindow) {
  'ngInject';

  const paceOptions = {
    ajax: {
      trackMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      ignoreURLs: [/dc.services.visualstudio.com/]
    }
  };
  $window.Pace.start(paceOptions);
}

export default angular.module('blocks.pageLoadProgress', [])
  .run(configPaceSpinner)
  .name;
