import logger, {Logger} from '../logger/logger.module';

export class Exception {
  constructor(private $q: ng.IQService, private logger: Logger) { 'ngInject'; }

  catcher(message: any) {
    return (e: any) => {
      let thrownDescription, newMessage;
      if (e.data && e.data.description) {
        thrownDescription = '\n' + e.data.description;
        newMessage = message + thrownDescription;
      }
      e.data.description = newMessage;
      this.logger.error(newMessage);
      return this.$q.reject(e);
    };
  }
}

export default angular.module('blocks.exception.service', [logger])
  .service('exception', Exception)
  .name;
